from django.http import JsonResponse
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from .models import Comment, Post


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request):
    try:
        post_id = request.data['id']
        post = Post.objects.get(pk=post_id)
        text = request.data.get('comment', '')
        comment = Comment(user=request.user, post=post, text=text)
        comment.save()
        return JsonResponse({"msg": "Comentario feito!"}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({'msg': 'Não foi possível criar seu comentario!'}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    try:
        comment_id = request.data['id']
        comment = Comment.objects.get(pk=comment_id, user=request.user)
        comment.delete()
        return JsonResponse({"msg": "Comentario deletado!"}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({'msg': 'Não foi possível deletar seu comentario!'}, status=404)
