from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
import imghdr

from .models import Profile
from .serializer import serialize_user
from .validate import valid_user, validate_password, validate_username, validate_email


@api_view(['POST'])
def register_user(request):
    try:
        password = request.data['password']
        pwd = request.data['pwd']
        username = request.data['username']
        email = request.data['email']
        image = request.data['image']
        imghdr.what(None, image.read())
        if valid_user(password, pwd, username, email):
            user = User(username=username, email=email, password=password)
            user.set_password(password)
            user.save()
            profile = Profile(user=user, image=image)
            profile.save()
            user = authenticate(username=username, password=password)
            token = Token.objects.create(user=user)  # type:ignore
            return JsonResponse({"token": token.key}, status=200)
        else:
            raise ValueError()
    except (AttributeError, KeyError, ValueError):
        return JsonResponse({"msg": "Informações incorretas!"}, status=401)


@api_view(['POST'])
def login(request):
    try:
        password = request.data['password']
        username = request.data['username']
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get(user=user)  # type:ignore
            return JsonResponse({"token": token.key}, status=200)
        else:
            return JsonResponse({"msg": "Login incorreto!"}, status=401)
    except KeyError:
        return JsonResponse({"msg": "Login incorreto!"}, status=401)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        password = request.data['password']
        pwd = request.data['pwd']
        username = request.data['username']
        email = request.data['email']
        try:
            image = request.data['image']
            imghdr.what(None, image.read())
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
            user.profile.save()
        user.save()
        return JsonResponse({"msg": "Usuario atualizado"}, status=200)
    except (KeyError, ValueError, ObjectDoesNotExist):
        return JsonResponse({"msg": "Não foi possivel atualizar!"}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    user_dict = serialize_user(user)
    return JsonResponse(user_dict, status=200)
