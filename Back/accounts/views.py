from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.contrib.auth import authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError
from datetime import timedelta

from .token import create_token_response, create_logout_response
from .models import CustomUser
from .serializer import UpdateUserSerializer
from .authentication import CookieTokenAuthentication


class LoginView(ModelViewSet):
    http_method_names = ['post', "get"]

    def create(self, request, *args, **kwargs):
        """ Função para fazer login """
        try:
            username = request.data['username']
            password = request.data['password']
            user = authenticate(request, username=username, password=password)

            if user:
                return create_token_response(user)

            else:
                return Response(data="Usuário ou senha incorretos", status=status.HTTP_401_UNAUTHORIZED)

        except (KeyError, ValueError, TypeError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data="Formulário incorreto!", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request, *args, **kwargs):  # Usado list para não precisar passar o id
        """
            Função de logout (usado o mesmo view do login para evitar código desnecessário)
            Sobrescreve o token no front por um vazio fazendo logout
         """
        logout(request)
        return create_logout_response()

    def retrieve(self, request, *args, **kwargs):
        """ Desativado para evitar erros com o get """
        return Response(status.HTTP_405_METHOD_NOT_ALLOWED)


class RegisterView(ModelViewSet):
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try:
            password = request.data['password']
            pwd = request.data['pwd']
            username = request.data['username']
            question = request.data['question']
            answer = request.data['answer']
            answer_hashed = make_password(answer)
            picture = request.data.get('image', None)

            if password == pwd:
                user = CustomUser.objects.create(
                    picture=picture,
                    username=username,
                    question=question,
                    answer=answer_hashed,
                )
                user.set_password(password)
                user.save()
                return create_token_response(user)

            else:
                return Response(data="Informações incorretas.", status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError as error:
            field = "Username" if "users_customuser_username_key" in str(error) else "E-mail"
            msg = f"{field} já cadastrado."
            print(msg)
            return Response(data=msg, status=status.HTTP_409_CONFLICT)

        except Exception as error:
            print(error)
            return Response(data="Formulário incorreto.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RecoveryPassword(ModelViewSet):
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        """
            Retorna a question para recuperação de senha
        """
        try:
            username = request.data['username']
            user = CustomUser.objects.get(username=username)
            question = user.question
            return Response({"question": question}, status=status.HTTP_200_OK)

        except (KeyError, ValueError, TypeError, AttributeError, ObjectDoesNotExist):
            return Response(data="Formulário incorreto!", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["POST"], url_path="update")
    def update_user(self, request):
        """ Atualiza o usuário se passar a resposta (answer) correta """
        try:
            print(request.data)
            user = CustomUser.objects.get(username=request.data['username'])
            serializer = UpdateUserSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                user = serializer.save()
                return create_token_response(user)

            else:
                print(serializer.errors)
                return Response(data="Informações incorretas.", status=status.HTTP_400_BAD_REQUEST)

        except (KeyError, ValueError, TypeError, AttributeError, ObjectDoesNotExist) as error:
            print(error)
            return Response(data="Formulário incorreto.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserMeMinimalView(APIView):
    """ Usado para o front verificar se o usuário está logado. """
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]
    authentication_classes = [ CookieTokenAuthentication ]

    @staticmethod
    def get(request, *args, **kwargs):
        """
            Usado para o front verificar se o token é valido
            Usado list para não precisar passar o id
        """
        lifetime = timedelta(minutes=30) # Tempo para fazer uma nova consulta
        return Response(lifetime, status=status.HTTP_200_OK)
