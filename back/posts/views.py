from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from .models import Post
from .serializers import serializer_post, serializer_modal


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_posts(request):
    user = request.user
    post_type = request.data.get('type', 'you')
    if post_type == 'You':
        posts = Post.objects.filter(user=user).order_by("-id")
    elif post_type == 'All':
        posts = Post.objects.all().exclude(user=user).order_by("-id")
    else:
        friends = user.profile.follows.all()
        query = Post.objects.filter(user__in=friends)
        user_query = Post.objects.filter(user=user)
        posts = query.union(user_query).order_by("-id")
    data = [serializer_post(item) for item in posts]
    return JsonResponse({"posts": data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_modal_info(request):
    try:
        post_id = request.data['id']
        user = request.user
        query = Post.objects.get(pk=post_id)
        data = serializer_modal(query, user, request)
        return JsonResponse({"post": data})
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({'msg': 'Post não encontrado!'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_post(request):
    try:
        text = request.data.get('text', '')
        image = request.data['image']
        post = Post(user=request.user, image=image, text=text)
        post.save()
        return JsonResponse({"msg": "Post adicionado"}, status=200)
    except (KeyError, ValueError):
        return JsonResponse({"msg": "Post incorreto"}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request):
    try:
        post_id = request.data['id']
        post = Post.objects.get(pk=post_id, user=request.user)
        post.delete()
        return JsonResponse({"msg": "Post deletado"}, status=200)
    except (KeyError, ValueError, ObjectDoesNotExist):
        return JsonResponse({"msg": "Post não encontrado"}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_manager(request):
    try:
        post_id = request.data['id']
        post = Post.objects.get(pk=post_id)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return JsonResponse({'msg': 'Like!'}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({'msg': 'Dislike!'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request):
    try:
        user_id = request.data['id']
        user = User.objects.get(pk=user_id)
        you = request.user
        friends = you.profile.follows
        if user == you:
            return JsonResponse({'msg': "Error"}, status=300)
        else:
            if user in friends.all():
                friends.remove(user)
            else:
                friends.add(user)
            return JsonResponse({'msg': 'Follow!'}, status=200)
    except (ObjectDoesNotExist, KeyError, ValueError):
        return JsonResponse({'msg': 'UnFollow!'}, status=404)
