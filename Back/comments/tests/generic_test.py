from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient
from PIL import Image
import io

from posts.models import Post
from accounts.models import CustomUser
from accounts.token import create_new_token


class AbstractGenericTests(TestCase):
    post_url = ""
    post = ""

    login_auth = {
        'username': 'temporary',
        'password': '1234567a',
    }
    new_user_auth = {
        **login_auth,
        'question': 'question',
        'answer': make_password('answer'), # Usada para criar um usuário basico pra testes
    }

    another_user_auth = {
        'username': 'another',
        'password': '1234x1234',
        'question': 'question',
        'answer': make_password('answer'),
    }

    post_data = {}

    def create_new_user(self):
        self.client = APIClient()
        self.user = self._create_new_user(self.new_user_auth)
        self.client.cookies['token'] = create_new_token(self.user)

    def create_another_user(self):
        self.another_user = self._create_new_user(self.another_user_auth)

    @staticmethod
    def _create_new_user(credentials):
        user = CustomUser.objects.create(**credentials)
        user.set_password(credentials['password'])
        user.save()
        return user

    @staticmethod
    def generic_create_new_post(post_data):
        post = Post.objects.create(**post_data)
        post.save()
        return post

    @staticmethod
    def create_new_picture():
        image_temp = Image.new('RGB', (100, 100))
        image_io = io.BytesIO()
        image_temp.save(image_io, format='jpeg')

        picture = SimpleUploadedFile(
            'test_image.jpg',
            image_io.getvalue(),
            content_type='image/jpeg'
        )
        return picture

    def create_post_data(self):
        data = {
            "image": self.create_new_picture(),
            "text": "text de test",
            "user": self.user,
        }

        return  data

    def create_new_post(self):
        self.post_data = self.create_post_data()
        self.post = self.generic_create_new_post(self.post_data)
        self.post_url = f"/posts/{self.post.id}/"

    # * * * * * * * * * * * * * * * Advanced tests * * * * * * * * * * * * * * *
    def _test_get_all_id_status_404_error(self, test_url, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self._test_get_url_status(url, 404)

    def _test_patch_all_id_status_404_error(self, test_url, request_data, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self._test_patch_url_status(url, request_data, 404)

    # * * * * * * * * * * * * * * * No token error * * * * * * * * * * * * * * *
    def _test_get_url_no_token_403_error(self, url):
        self.client.cookies['token'] = ""
        self._test_get_url_status(url, 403)

    def _test_post_url_no_token_403_error(self, url, request_data):
        self.client.cookies['token'] = ""
        self._test_post_url_status(url, request_data, 403)

    def _test_put_url_no_token_403_error(self, url, request_data):
        self.client.cookies['token'] = ""
        self._test_put_url_status(url, request_data, 403)

    def _test_patch_url_no_token_403_error(self, url, request_data):
        self.client.cookies['token'] = ""
        self._test_patch_url_status(url, request_data, 403)

    def _test_delete_url_no_token_403_error(self, url):
        self.client.cookies['token'] = ""
        self._test_delete_url_status(url, 403)

    def _test_post_patch_delete_url_no_token_403_error(self, url, request_data):
        self.client.cookies['token'] = ""
        self._test_post_url_status(url, request_data, 403)
        self._test_patch_url_status(url, request_data, 403)
        self._test_delete_url_status(url, 403)

    # * * * * * * * * * * * * * * * Basic tests * * * * * * * * * * * * * * *
    def _test_get_url_status(self, test_url, status):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, status)

    def _test_post_url_status(self, test_url, request_data, status):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def _test_put_url_status(self, test_url, request_data, status):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def _test_patch_url_status(self, test_url, request_data, status):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def _test_delete_url_status(self, test_url, status):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, status)

    """ Compare content type """
    def _test_get_url_compare_content_type(self, test_url,  content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.get(test_url)
        self.compare_content_type(response, content_type)

    def _test_post_url_compare_content_type(self, test_url, request_data, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.post(test_url, request_data, format='multipart')
        self.compare_content_type(response, content_type)

    def _test_patch_url_compare_content_type(self, test_url, request_data, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.patch(test_url, request_data, format='multipart')
        self.compare_content_type(response, content_type)

    def _test_delete_url_compare_content_type(self, test_url, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.delete(test_url)
        self.compare_content_type(response, content_type)

    def compare_content_type(self, response, content_type):
        """ Função que compara os tipos dos conteúdos do response (usado varias vezes) """
        try:
            content = response['Content-Type']

        except KeyError:
            content = None

        self.assertEqual(content, content_type)

    """ Compare content value """
    def _test_get_url_compare_response_content(self, test_url, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.get(test_url)
        self.compare_content_value(response, json_content)

    def _test_post_url_compare_response_content(self, test_url, request_data, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.post(test_url, request_data, format='multipart')
        self.compare_content_value(response, json_content)

    def _test_patch_url_compare_response_content(self, test_url, request_data, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.patch(test_url, request_data, format='multipart')
        self.compare_content_value(response, json_content)

    def _test_delete_url_compare_response_content(self, test_url, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.delete(test_url)
        self.compare_content_value(response, json_content)

    def compare_content_value(self, response, json_content):
        """ Função que compara os conteúdos do response (usado varias vezes) """
        try:
            result = response.json()

        except TypeError:
            result = None

        self.assertEqual(result, json_content)