from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token


class CookieTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        """ Verifica se o usuário esta logado e o token e valido """
        token_key = request.COOKIES.get('token')

        if not token_key:
            return None

        try:
            token = Token.objects.select_related('user').get(key=token_key)
            user = token.user

        except Token.DoesNotExist:
            raise AuthenticationFailed('Token inválido ou expirado.')

        if not user.is_active:
            raise AuthenticationFailed('Conta desativada.')

        return user, token