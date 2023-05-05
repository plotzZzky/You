from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
import imghdr

from .models import Profile
from .serializer import serialize_user


@api_view(['POST'])
@csrf_exempt
def register_user(request):
    try:
        password = request.data['password1']
        pwd = request.data['password2']
        username = request.data['username']
        email = request.data['email']
        image = request.data['image']
        imghdr.what(None, image.read())
        if valid_user(password, pwd, username, email):
            user = User(username=username, email=email, password=password)
            user.set_password(password)
            user.save()
            user = authenticate(username=username, password=password)
            token = Token.objects.create(user=user)  # type:ignore
            profile = Profile(user=user, image=image)
            profile.save()
            return JsonResponse({"token": token.key}, status=200)
        else:
            return JsonResponse({"error": "Informações incorretas!"}, status=300)
    except AttributeError:
        return JsonResponse({"error": "Imagem incorreta!"}, status=300)
    except KeyError:
        return JsonResponse({"error": "Informações incorretas!"}, status=300)


@api_view(['POST'])
@csrf_exempt
def login(request):
    try:
        password = request.data['password']
        username = request.data['username']
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get(user=user)  # type:ignore
            return JsonResponse({"token": token.key}, status=200)
        else:
            return JsonResponse({"error": "Login incorreto!"}, status=300)
    except KeyError:
        return JsonResponse({"error": "Login incorreto!"}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def update_profile(request):
    password = request.data['password1']
    pwd = request.data['password2']
    username = request.data['username']
    email = request.data['email']
    try:
        image = request.data['image']
    except KeyError:
        image = None
    user = request.user
    if validate_username(username):
        user.username = username
    if validate_email(email):
        user.email = email
    if validate_password(password, pwd):
        user.set_password(password)
    if image:
        user.profile.image = image
    user.save()
    return JsonResponse({"text": "Usuario atualizado"}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user
    logout(request)
    user.delete()
    return HttpResponse('Usuario deletado', status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    user_dict = serialize_user(user)
    return JsonResponse(user_dict, status=200)


def valid_user(password, pwd, username, email):
    if not validate_password(password, pwd):
        return False
    if not validate_username(username):
        return False
    if not validate_email(email):
        return False
    return True


def validate_password(password, pwd):
    return False if password != pwd or len(password) < 5 else True


def validate_username(username):
    return False if len(username) < 4 else True


def validate_email(email):
    if '@' not in email or 'mail.com' not in email:
        return False
    else:
        return True
