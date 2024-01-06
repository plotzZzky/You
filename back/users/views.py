from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import IntegrityError
import imghdr

from .token import create_new_token
from .models import Profile, get_filename
from .serializer import serialize_user
from .validate import (valid_user, validate_password, validate_username, validate_email, validate_question,
                       validate_answer)


@api_view(['POST'])
def register_user(request):
    try:
        password = request.data['password']
        pwd = request.data['pwd']
        username = request.data['username']
        email = request.data['email']
        question = request.data['question']
        answer = request.data['answer']
        image = request.data.get('image', None)
        filename = get_filename(image)
        image_path = f"http://localhost:8080/media/profiles/{filename}"

        if valid_user(password, pwd, username, email):
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            authenticate(username=username, password=password)
            token = create_new_token(user)  # type:ignore
            # salva a respota ja protegida por hash
            answer_hashed = make_password(answer)
            Profile.objects.create(user=user, question=question, answer=answer_hashed, image=image_path)
            return JsonResponse({"token": token.key, "filename": filename}, status=200)
        else:
            raise ValueError()
    except (AttributeError, KeyError, ValueError):
        return JsonResponse({"msg": "Informações incorretas!"}, status=401)
    except IntegrityError as error:
        if 'auth_user_username_key' in str(error):
            field = 'Nome de usuario'
        else:
            field = 'O e-mail'
        return JsonResponse({"msg": f"{field} já existe e não pode ser cadastrado!"})


@api_view(['POST'])
def login_user(request):
    try:
        password = request.data['password']
        username = request.data['username']
        user = authenticate(username=username, password=password)
        if user is not None:
            token = create_new_token(user)
            return JsonResponse({"token": token.key}, status=200)
        else:
            return JsonResponse({"msg": "Login incorreto!"}, status=401)
    except KeyError:
        return JsonResponse({"msg": "Login incorreto!"}, status=401)


# Atualiza as informações do usario
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user(request):
    try:
        user = request.user
        password = request.data.get('password', "")
        pwd = request.data.get('pwd', "")
        username = request.data.get('username', "")
        email = request.data.get('email', "")
        image = request.data.get('image', None)
        question = request.data.get('question', None)
        answer = request.data.get('answer', None)

        if image is not None:
            imghdr.what(None, image.read())
            user.profile.image = image
        if validate_username(username):
            user.username = username
        if validate_email(email):
            user.email = email
        if validate_question(question):
            user.profile.question = question
        new_answer = validate_answer(answer)
        if new_answer:
            user.profile.answer = new_answer
        if password == pwd:
            if validate_password(password, pwd):
                user.set_password(password)
        else:
            user.save()
            user.profile.save()
            return JsonResponse({"msg": "As senhas não são iguais, mas os demais dados foram atualizados!"})
        user.save()
        user.profile.save()
        return JsonResponse({"msg": "Dados atualizados!"}, status=200)
    except (ValueError, ObjectDoesNotExist):
        return JsonResponse({"msg": "Não foi possivel atualizar!"}, status=400)


# Retorna as informações sobre um usuario no formato json
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def receive_user_profile(request):
    try:
        user = request.user
        user_json = serialize_user(user)
        return JsonResponse(user_json, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'msg': 'Usuario não existe!'}, 401)


# Recuperação de senha, atraves de pergunta e resposta
@api_view(['POST'])
def recovery_password(request):
    try:
        username = request.data['username']
        answer = request.data['answer']
        password = request.data['password']
        pwd = request.data['pwd']
        user = User.objects.get(username=username)
        if check_password(answer, user.profile.answer):
            if validate_password(password, pwd):
                user.set_password(password)
                user.save()
                return JsonResponse({"msg": "Senha atualizada!"}, status=200)
            else:
                return JsonResponse(
                    {"msg": "As senhas precisam ser iguais, no minimo uma letra, numero e 8 digitos!"}, status=400)
        else:
            raise ValueError()
    except (KeyError, ValueError, ObjectDoesNotExist):
        return JsonResponse({"msg": "Resposta incorreta!"}, status=400)


# Envia a question do usuario para o front para fazer a recuperação de senha
@api_view(['POST'])
def receive_your_question(request):
    try:
        username = request.data['username']
        user = User.objects.get(username=username)
        question = user.profile.question
        return JsonResponse({"question": question}, status=200)
    except (KeyError, ValueError, ObjectDoesNotExist):
        return JsonResponse({"msg": "Usuario não encontrado"}, status=400)


# Esse end point é usado pelo cdn, para permitir o usuario acessar o back
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def validate_token(request):
    return JsonResponse({'message': 'Token is valid'}, status=200)
