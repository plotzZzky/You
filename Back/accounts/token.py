from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta


def create_token_response(user):
    """ Retorna o response com o cookie httponly com o token """
    response = Response(status=status.HTTP_200_OK)
    create_auth_cookie(user, response)  # Cria o cookie http only com o token dentro
    return response


def create_logout_response():
    """ Retorna o response com o cookie httponly sem o token (para fazer logout no front) """
    response = Response(status.HTTP_200_OK)
    logout_auth_cookie(response)
    return response


def create_new_token(user):
    """
        Função que retona um novo token para o usuario
        Essa função cria um novo token a cada login, para evitar problemas com vazamento de token

        Steps:
            - Verifica se o usuario ja possui token
                - Passes:
                    - Deleta o token antigo
                - Fails:
                    - Continua a execução
            - Cria um novo token para o usuario

        Parameters:
            - user (User): A referencia do Objeto do usuario

        Return:
            O novo token
    """
    try:
        token = Token.objects.get(user=user)  # type: ignore
        token.delete()

    except ObjectDoesNotExist:
        pass

    new_token = Token.objects.create(user=user)  # type: ignore
    new_token.save()
    return new_token


def create_auth_cookie(user, response):
    token = create_new_token(user)
    response.set_cookie(
        'token',
        token.key,
        max_age=3600,
        expires=timedelta(hours=1),
        httponly=True,
        samesite="Lax",
        secure=False,  # Usado para HTTP
        path="/",
    )


def logout_auth_cookie(response):
    response.set_cookie(
        'token',
        max_age=0,
        httponly=True,
        secure=False,
        path="/"
    )
