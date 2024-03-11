from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .models import Post
from .serializers import PostSerializer, ModalSerializer, modal_serializer


class PostClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ModalSerializer(instance, context={'request': request})
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def all(self, request, *args, **kwargs):
        """ Retorna a lista com todos os posts para a timeline """
        user = request.user
        post_type = request.data.get('type', 'you')

        if post_type == 'you':
            posts = Post.objects.filter(user=user).order_by("-id")
        elif post_type == 'all':
            posts = Post.objects.exclude(user=user).order_by("-id")
        else:
            friends = user.profile.follows.all()
            query = Post.objects.filter(user__in=friends)
            user_query = Post.objects.filter(user=user)
            posts = query.union(user_query).order_by("-id")
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
    queryset = []
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        try:
            post_id = request.data['id']
            post = Post.objects.get(pk=post_id)
            if request.user in post.likes.all():
                post.likes.remove(request.user)
            else:
                post.likes.add(request.user)
            return Response({'msg': 'Like!'}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response({'msg': 'Dislike!'}, status=status.HTTP_400_BAD_REQUEST)


class FollowClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = []
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        try:
            user_id = request.data['id']
            user = User.objects.get(pk=user_id)
            you = request.user
            friends = you.profile.follows
            if user == you:
                return Response({'msg': "Error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if user in friends.all():
                    friends.remove(user)
                else:
                    friends.add(user)
                return Response({'msg': 'Follow!'}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response({'msg': 'UnFollow!'}, status=status.HTTP_400_BAD_REQUEST)
