from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Post, Profile
from .token import check_token


@api_view(['POST'])
def add_post(request):
    try:
        image = request.data['image']
        token = request.data['token']
        if check_token(token):
            post = Post(image=image)
            post.save()
            return JsonResponse({"msg": "Post feito!"}, status=200)
        else:
            raise ValueError()
    except (KeyError, ValueError):
        return JsonResponse({"msg": "Post incorreto"}, status=401)


@api_view(['POST'])
def add_profile_picture(request):
    try:
        image = request.data['image']
        pic = Profile(image=image)
        pic.save()
        return JsonResponse({"msg": "Foto criada!"}, status=200)
    except (KeyError, ValueError):
        return JsonResponse({"msg": "Erro!"}, status=401)
