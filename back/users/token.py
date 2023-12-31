from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from datetime import timedelta, datetime


def create_new_token(user):
    try:
        token = Token.objects.get(user=user)  # type: ignore
        token.delete()
    except ObjectDoesNotExist:
        pass

    new_token = Token.objects.create(user=user)  # type: ignore
    new_token.expires = datetime.now() + timedelta(minutes=10)
    new_token.save()
    return new_token


# Verifica a ultima atividade do usuario, se passar mais de 10min deleta o token
def check_last_activity(user):
    token = Token.objects.get(user=user)  # type: ignore
    # Se a ultima a geração do token foi a menos de 20min gera um novo, do contario deleta o token
    inactive_period = timedelta(minutes=20)
    current_time = datetime.now()
    time_since_activity = current_time - token.expires

    if time_since_activity > inactive_period:
        token.delete()
    else:
        token.expires = datetime.now() + timedelta(minutes=10)
        token.save()
        return token
