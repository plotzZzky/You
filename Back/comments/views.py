from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from .models import Comment, Post
from .serializer import PublicCommentSerializer, CreateCommentSerializer


class CommentClassView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']
    queryset = Comment.objects.all()
    serializer_class = PublicCommentSerializer

    def list(self, request, *args, **kwargs):
        """ Desativado por não ser necessario """
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, *args, **kwargs):
        """
         Retorna a lista com todos os comentários de um post
         Kwargs:
             post_id (int) - O id do post
        """
        post_id = kwargs['pk']  # Id do post
        post = Post.objects.get(pk=post_id)
        query = post.comments.all()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            serializer = CreateCommentSerializer(data=request.data, context={'request': request})

            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(data="Comentario feito!", status=status.HTTP_200_OK)

            else:
                print(serializer.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)

        except (ObjectDoesNotExist, KeyError, ValueError) as error:
            print(error)
            return Response(data='Não foi possível criar seu comentario!', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        try:
            user = request.user
            comment_id = kwargs['pk']
            post = Comment.objects.get(pk=comment_id, user=user)
            post.delete()
            return Response(data="Comentario deletado!", status=status.HTTP_200_OK)

        except (KeyError, ValueError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data="Comentario não encontrado", status=status.HTTP_400_BAD_REQUEST)
