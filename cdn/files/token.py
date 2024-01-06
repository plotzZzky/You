import requests


# verifica se o token, do usuario é valido
def check_token(token):
    url = 'http://127.0.0.1:8000/users/validate/'
    headers = {
        'Authorization': f'Token {token}',
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response
