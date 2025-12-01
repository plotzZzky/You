from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from .models import Comment, Post
from .serializer import CommentSerializer


class CommentClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            post_id = kwargs['pk']  # Id do post
            post = Post.objects.get(pk=post_id)
            query = Comment.objects.filter(post=post)
            serializer = self.get_serializer(query, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except (KeyError, ValueError, TypeError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data="Erro no servidor", status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        try:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response("Comentário criado", status=status.HTTP_201_CREATED)

            else:
                print(serializer.errors)
                return Response(data="Não foi possível criar o comentário", status=status.HTTP_400_BAD_REQUEST)

        except (KeyError, ValueError, TypeError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data='Erro no servidor', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            comment_id = kwargs['pk']
            post = Comment.objects.get(pk=comment_id, user=user)
            post.delete()
            return Response(data="Comentário deletado", status=status.HTTP_200_OK)

        except (KeyError, ValueError, TypeError, ObjectDoesNotExist) as error:
            print(error)
            return Response("Comentário não encontrado", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request, *args, **kwargs):
        return Response(status.HTTP_405_METHOD_NOT_ALLOWED)
