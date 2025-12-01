from django.test import TestCase
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient

from users.models import CustomUser


class AbstractGenericTests(TestCase):
    login_url: str = "/auth/login/"
    register_url: str = "/auth/register/"
    recovery_url: str = "/auth/recovery/"
    set_pwd_url: str = "/auth/recovery/set/"

    login_auth = {
        'username': 'temporary',
        'password': '1234567a',
    }
    new_user_auth = {
        **login_auth,
        'question': 'question',
        'answer': make_password('answer'), # Usada para criar um usuário basico pra testes
    }
    register_auth = {
        **login_auth,
        'pwd': '1234567a',
        'question': 'question',
        'answer': 'answer',
    }
    register_auth_error = {
        'username': 'fake',
        'password': '1234567b',
        'pwd': '1234567b',
        'question': 'question',
        'answer': 'incorrect',
    }

    def create_new_user(self):
        self.client = APIClient()
        self.user = self._create_new_user(self.new_user_auth)

    @staticmethod
    def _create_new_user(credentials):
        user = CustomUser.objects.create(**credentials)
        user.set_password(credentials['password'])
        user.save()
        return user

    def _test_get_url_status(self, test_url, credentials, status):
        response = self.client.get(test_url, credentials)
        self.assertEqual(response.status_code, status)

    def _test_post_url_status(self, test_url, credentials, status):
        response = self.client.post(test_url, credentials)
        self.assertEqual(response.status_code, status)

    def _test_put_url_status(self, test_url, credentials, status):
        response = self.client.put(test_url, credentials)
        print(response.status_code)
        self.assertEqual(response.status_code, status)

    def _test_patch_url_status(self, test_url, credentials, status):
        response = self.client.patch(test_url, credentials)
        self.assertEqual(response.status_code, status)

    def _test_delete_url_status(self, test_url, credentials, status):
        response = self.client.delete(test_url, credentials)
        self.assertEqual(response.status_code, status)

    def _test_response_content_type(self, test_url, credentials, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.post(test_url, credentials)
        try:
            content = response['Content-Type']

        except KeyError:
            content = None

        self.assertEqual(content, content_type)

    def _test_compare_response_content(self, test_url, credentials, content_json):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.post(test_url, credentials)
        try:
            result = response.json()

        except TypeError:
            result = None

        self.assertEqual(result, content_json)