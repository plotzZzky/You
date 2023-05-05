from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated

from .models import Post, Comment
from .serializers import serializer_post, serializer_modal


# # # # # # # # # # # # # # # # Posts # # # # # # # # # # # # # # # #
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_your_posts(request):
    user = request.user
    query = Post.objects.filter(user=user).order_by("-id")  # type: ignore
    data = [serializer_post(item) for item in query]
    return JsonResponse({"posts": data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friends_posts(request):
    user = request.user
    friends = user.profile.follows.all()
    query = Post.objects.filter(user__in=friends).order_by("-id")  # type: ignore
    user_query = Post.objects.filter(user=user).order_by("-id")  # type: ignore
    posts = query.union(user_query)
    data = [serializer_post(item) for item in posts]
    return JsonResponse({"posts": data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_horizon_posts(request):
    user = request.user
    query = Post.objects.all().exclude(user=user).order_by("-id")  # type: ignore
    data = [serializer_post(item) for item in query]
    return JsonResponse({"posts": data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_modal_info(request, post_id):
    try:
        user = request.user
        query = Post.objects.get(pk=post_id)  # type: ignore
        data = serializer_modal(query, user, request)
        return JsonResponse({"post": data})
    except Post.DoesNotExist:  # type: ignore
        return HttpResponse(status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def add_post(request):
    try:
        text = request.data['text']
        image = request.data['image']
        post = Post(user=request.user, image=image, text=text)
        if post.save():
            return HttpResponse("Post adicionado", status=200)
        return HttpResponse("Post adicionado", status=300)
    except KeyError:
        return HttpResponse("Post incorreto", status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id, user=request.user)  # type: ignore
        post.delete()
        return HttpResponse("Post deletado", status=200)
    except Post.DoesNotExist:  # type:ignore
        return HttpResponse("Post não encontrado", status=404)


# # # # # # # # # # # # # # # # Comments # # # # # # # # # # # # # # # #
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def add_comment(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)  # type: ignore
        text = request.POST['comment']
        comment = Comment(user=request.user, post=post, text=text)
        comment.save()
        return HttpResponse("Comentario feito", status=200)
    except Post.DoesNotExist:  # type: ignore
        return HttpResponse(status=404)
    except KeyError:
        return HttpResponse(status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(pk=comment_id, user=request.user)  # type: ignore
        comment.delete()
        return HttpResponse("Comentario deletado", status=200)
    except Comment.DoesNotExist:  # type: ignore
        return HttpResponse(status=404)


# # # # # # # # # # # # # # # # Managers # # # # # # # # # # # # # # # #
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def like_manager(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)  # type: ignore
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return HttpResponse(status=200)
    except Post.DoesNotExist:  # type: ignore
        return HttpResponse(status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def follow_manager(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        you = request.user
        friends = you.profile.follows
        if user == you:
            return HttpResponse("Error", status=300)
        else:
            if user in friends.all():
                friends.remove(user)
            else:
                friends.add(user)
            return HttpResponse(status=200)
    except User.DoesNotExist:  # type: ignore
        return HttpResponse(status=404)
