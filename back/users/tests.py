from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import json
import io

from .models import Profile


class LoginTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.credentials_error = {'username': 'user_error', 'password': '12334555'}

    def test_login_status(self):
        response = self.client.post('/users/login/', self.credentials)
        self.assertEqual(response.status_code, 200)

    def test_login_content_type(self):
        response = self.client.post('/users/login/', self.credentials)
        try:
            j = json.loads(response.content)
            ValueError()
        except ValueError:
            j = False
        self.assertNotEqual(j, False)

    def test_login_content_result(self):
        response = self.client.post('/users/login/', self.credentials)
        result = json.loads(response.content)
        r = True if "token" in result else False
        self.assertTrue(r)
        self.assertEqual(result['token'], self.token.key)

    def test_login_status_error(self):
        response = self.client.post('/users/login/', self.credentials_error)
        self.assertEqual(response.status_code, 401)

    def test_login_status_error_empty(self):
        response = self.client.post('/users/login/', {})
        self.assertEqual(response.status_code, 401)


class RegisterUserTest(TestCase):
    def setUp(self):
        image_temp = Image.new('RGB', (100, 100))
        image_io = io.BytesIO()
        image_temp.save(image_io, format='PNG')
        image_io.seek(0)
        self.uploaded_file = SimpleUploadedFile('test_image.png', image_io.read(), content_type='image/png')

        self.credentials = {
            'username': 'newuser',
            'email': 'newuser@mail.com',
            'password': '1234x567',
            'pwd': '1234x567',
            'image': self.uploaded_file
        }

    def test_register_status(self):
        response = self.client.post('/users/register/', self.credentials)
        self.assertEqual(response.status_code, 200)

    def test_register_check_token(self):
        response = self.client.post('/users/register/', self.credentials)
        user = User.objects.get(username=self.credentials['username'])
        token = Token.objects.get(user=user)  # type: ignore
        result = json.loads(response.content)
        r = True if "token" in result else False
        self.assertTrue(r)
        self.assertEqual(result['token'], token.key)

    def test_register_status_error_username(self):
        credentials = {
            'username': 'aa',
            'email': 'newuser@mail.com',
            'password1': '1234x567',
            'password2': '1234x567'
        }
        response = self.client.post('/users/register/', credentials, content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_register_status_error_email(self):
        credentials = {
            'username': 'newuser',
            'email': '',
            'password1': '1234x567',
            'password2': '1234x567'
        }
        response = self.client.post('/users/register/', credentials, content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_register_status_error_pwd1(self):
        credentials = {
            'username': 'newuser',
            'email': 'newuser@mail.com',
            'password1': '',
            'password2': '1234x567'
        }
        response = self.client.post('/users/register/', credentials, content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_register_status_error_pwd2(self):
        credentials = {
            'username': 'newuser',
            'email': 'newuser@mail.com',
            'password1': '1234x567',
            'password2': ''
        }
        response = self.client.post('/users/register/', credentials, content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_register_status_error_pwd_diferent(self):
        credentials = {
            'username': 'newuser',
            'email': 'newuser@mail.com',
            'password1': '1233x567',
            'password2': '1234x567'
        }
        response = self.client.post('/users/register/', credentials, content_type="application/json")
        self.assertEqual(response.status_code, 401)


class UpdateUserTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.uploaded_file = self.create_image_model()

        self.user_data = {
            'username': 'newuser',
            'email': 'newuser@mail.com',
            'password': '1234x567',
            'pwd': '1234x567',
            'image': self.uploaded_file
        }

        self.create_test_user()

    def create_test_user(self):
        self.user = User.objects.create_user({'username': 'username', 'password': 'password'})
        self.profile = Profile(user=self.user, image=self.uploaded_file)
        self.profile.save()
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @staticmethod
    def create_image_model():
        image_temp = Image.new('RGB', (100, 100))
        image_io = io.BytesIO()
        image_temp.save(image_io, format='PNG')
        image_io.seek(0)
        return SimpleUploadedFile('test_image.png', image_io.read(), content_type='image/png')

    def test_update_user_status_200(self):
        response = self.client.post('/users/edit/', self.user_data)
        self.assertEqual(response.status_code, 200)

    def test_update_user_status_401_error(self):
        self.client.credentials()
        response = self.client.post('/users/edit/', self.user_data)
        self.assertEqual(response.status_code, 401)

    def test_update_user_no_data_error(self):
        response = self.client.post('/users/edit/')
        self.assertEqual(response.status_code, 400)

    def test_update_user_check_if_name_updated(self):
        data = self.user_data
        data['username'] = 'zeka'
        response = self.client.post('/users/edit/', data)
        user = User.objects.get(username=data['username'])
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(user)

    def test_update_user_check_if_email_updated(self):
        data = self.user_data
        data['email'] = 'mail@mail.com'
        self.client.post('/users/edit/', data)
        try:
            user = User.objects.get(email=data['email'])
        except ObjectDoesNotExist:
            user = None
        self.assertIsNotNone(user)

    def test_update_user_check_if_pwd_updated(self):
        data = self.user_data
        data['pwd'] = '12345678'
        data['password'] = '12345678'
        self.client.post('/users/edit/', data)
        self.client.credentials()
        response = self.client.post('/users/login/', {'username': data['username'], 'password': data['pwd']})
        self.assertEqual(response.status_code, 200)

    def test_get_user_info_status_200(self):
        response = self.client.get('/users/profile/')
        self.assertEqual(response.status_code, 200)

    def test_get_user_info_response_is_json(self):
        response = self.client.get('/users/profile/')
        if 'username' in response.json():
            self.assertTrue(True)
        else:
            self.assertTrue(False)
