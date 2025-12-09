from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import CustomUser
from django.core.exceptions import ObjectDoesNotExist

from .models import Post
from .serializers import SimplePostSerializer, FullPostSerializer
from accounts.serializer import PublicUserSerializer


class PostClassView(ModelViewSet):
    permission_classes = [ IsAuthenticated ]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = SimplePostSerializer
    queryset = Post.objects.all()

    def list(self, request, *args, **kwargs):
        """ Retorna todos os posts exceto os do usuário atual """
        user = request.user
        posts = Post.objects.exclude(user=user).order_by("-id")  # Retorna a lista de cards exceto a do usuário
        serializer = self.get_serializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        """ Retorna um post especifico """
        try:
            instance = self.get_object()
            if request.user in instance.likes.all():
                instance.liked = True

            serializer = FullPostSerializer(instance, context={'request': request})
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except (TypeError, ValueError, TypeError, ObjectDoesNotExist):
            return Response(data="Post não encontrado.", status=status.HTTP_404_NOT_FOUND)


    def create(self, request, *args, **kwargs):
        try:

            serializer = FullPostSerializer(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
                return Response(data="Post criado", status=status.HTTP_200_OK)

            else:
                print(serializer.errors)
                return Response(data="Não foi possível criar o post", status=status.HTTP_400_BAD_REQUEST)

        except (KeyError, ValueError, TypeError, AttributeError) as error:
            print(error)
            return Response(data="Erro no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            post_id = kwargs['pk']
            post = Post.objects.get(pk=post_id, user=user)
            post.delete()
            return Response(data="Post deletado!", status=status.HTTP_200_OK)

        except (KeyError, ValueError, AttributeError, TypeError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data="Post não encontrado", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersPostsClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']
    serializer_class = SimplePostSerializer

    def retrieve(self, request, *args, **kwargs):
        """ Retorna a lista de posts de um usuário específico """
        try:
            pk: int = kwargs['pk']
            user_id = request.user.id if pk == '0' else pk

            user = CustomUser.objects.get(pk=user_id)
            posts = Post.objects.filter(user=user).order_by("-id")

            serializer = self.get_serializer(posts, many=True)
            user_serializer = PublicUserSerializer(user, context={'request': request})

            result = {'posts': serializer.data, "user": user_serializer.data}
            print(result['user'])
            return Response(data=result, status=status.HTTP_200_OK)

        except (KeyError, ValueError, TypeError) as error:
            print(error)
            return Response(status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        """ Retorna a lista de posts de quem você segue """
        user = request.user
        followers = user.followers.all()

        posts = Post.objects.filter(user__in=followers)
        user_posts = Post.objects.filter(user=request.user)
        all_posts = posts.union(user_posts).order_by("-id")

        serializer = self.get_serializer(all_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LikeClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def retrieve(self, request, *args, **kwargs):
        try:
            post_id = kwargs['pk']
            post = Post.objects.get(pk=post_id)

            if request.user in post.likes.all():
                post.likes.remove(request.user)
                return Response(data='Dislike!', status=status.HTTP_200_OK)

            else:
                post.likes.add(request.user)
                return Response(data='Like!', status=status.HTTP_200_OK)

        except (ObjectDoesNotExist, KeyError, ValueError, AttributeError) as error:
            print(error)
            return Response(data="Erro no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FollowClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def retrieve(self, request, *args, **kwargs):
        try:
            user_id = kwargs['pk']  # Id do usuário a ser seguido
            follow_user = CustomUser.objects.get(pk=user_id)
            you = request.user
            friends = you.followers

            if follow_user == you:
                return Response(data="Não pode seguir a si mesmo", status=status.HTTP_400_BAD_REQUEST)

            else:
                if follow_user in friends.all():
                    friends.remove(follow_user)
                    return Response(data='Unfollow!', status=status.HTTP_200_OK)

                else:
                    friends.add(follow_user)
                    return Response(data='Follow!', status=status.HTTP_200_OK)

        except (ObjectDoesNotExist, KeyError, ValueError, AttributeError) as error:
            print(error)
            return Response(data='Erro no servidor', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
