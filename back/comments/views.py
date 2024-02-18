from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from .models import Comment, Post
from .serializer import CommentSerializer


class CommentClassView(ModelViewSet):
    IsAuthenticated = True
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        try:
            post_id = request.data['postId']
            post = Post.objects.get(pk=post_id)
            text = request.data.get('comment', '')
            comment = Comment(user=request.user, post=post, text=text)
            comment.save()
            return Response({"msg": "Comentario feito!"}, status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, KeyError, ValueError):
            return Response({'msg': 'Não foi possível criar seu comentario!'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            comment_id = kwargs['pk']
            post = Comment.objects.get(pk=comment_id, user=user)
            post.delete()
            return Response({"msg": "Comentario deletado!"}, status=status.HTTP_200_OK)
        except (KeyError, ValueError, ObjectDoesNotExist):
            return Response({"msg": "Comentario não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
