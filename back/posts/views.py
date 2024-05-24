from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .models import Post
from .serializers import PostSerializer, ModalSerializer


class PostClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ModalSerializer(instance, context={'request': request})
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except (TypeError, ValueError, ObjectDoesNotExist):
            return Response({'error': 'Post não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request, *args, **kwargs):
        """ Desativado por não ser necessario """
        user = request.user
        posts = Post.objects.exclude(user=user).order_by("-id")
        serializer = self.get_serializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path=r'user/(?P<pk>\d+)')
    def posts_from_users(self, request, *args, **kwargs):
        """ Retorna a lista de posts de um usuario especifico """
        user_id = kwargs['pk']  # id do perfil
        if user_id == r'0':
            user = request.user
        else:
            user = User.objects.get(pk=user_id)
        posts = Post.objects.filter(user=user).order_by("-id")
        serializer = self.get_serializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='followee')
    def posts_from_followee(self, request, *args, **kwargs):
        """ Retorna a lista de posts de quem voce segue """
        user = request.user
        friends = user.profile.follows.all()
        posts = Post.objects.filter(user__in=friends).order_by("-id")
        serializer = self.get_serializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            text = request.data.get('text', '')
            image = request.data['image']
            post = Post.objects.create(user=request.user, image=image, text=text)

            return Response({"postId": post.id}, status=status.HTTP_200_OK)
        except (KeyError, ValueError):
            return Response({"msg": "Post incorreto"}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            post_id = kwargs['pk']
            post = Post.objects.get(pk=post_id, user=user)
            post.delete()

            return Response({"msg": "Post deletado!"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"msg": "Post não encontrado"}, status=status.HTTP_400_BAD_REQUEST)


class LikeClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']
    queryset = []
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        try:
            post_id = request.data['id']
            post = Post.objects.get(pk=post_id)
            if request.user in post.likes.all():
                post.likes.remove(request.user)
                return Response({'msg': 'Dislike!'}, status=status.HTTP_200_OK)
            else:
                post.likes.add(request.user)
            return Response({'msg': 'Like!'}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FollowClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']
    queryset = []
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        try:
            user_id = request.data['id']  # Id do usuario a ser seguido
            follow_user = User.objects.get(pk=user_id)
            you = request.user
            friends = you.profile.follows

            if follow_user == you:
                return Response({'msg': "Error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if follow_user in friends.all():
                    friends.remove(follow_user)
                else:
                    friends.add(follow_user)
                return Response({'msg': 'Follow!'}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response({'msg': 'UnFollow!'}, status=status.HTTP_400_BAD_REQUEST)
