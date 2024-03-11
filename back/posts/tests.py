from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

from users.models import Profile, Post


class PostsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}

        self.uploaded_file = self.create_image_model()
        self.create_test_user()

    def create_test_user(self):
        self.user = User.objects.create_user(**self.credentials)
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

    def create_new_post(self):
        post = Post.objects.create(
            user=self.user,
            image=self.uploaded_file,
            text='Test de postagem!'
        )
        return post

    # Get posts
    def test_get_posts_status(self):
        response = self.client.post('/posts/')
        self.assertEqual(response.status_code, 200)

    def test_get_posts_status_401_error(self):
        self.client.credentials()
        response = self.client.post('/posts/')
        self.assertEqual(response.status_code, 401)

    def test_get_posts_by_type_status(self):
        response_nothing = self.client.post('/posts/')
        self.assertEqual(response_nothing.status_code, 200)
        response_you = self.client.post('/posts/', {'type': 'you'})
        self.assertEqual(response_you.status_code, 200)
        response_all = self.client.post('/posts/', {'type': 'all'})
        self.assertEqual(response_all.status_code, 200)
        response_rand = self.client.post('/posts/', {'type': 'qualquercoisa'})
        self.assertEqual(response_rand.status_code, 200)

    def test_get_posts_response_if_json(self):
        response = self.client.post('/posts/')
        if 'posts' in response.json():
            self.assertTrue(True)
        else:
            self.assertTrue(False)

    # Get modal info
    def test_get_modal_info_status_200(self):
        post = self.create_new_post()
        response = self.client.post('/posts/info/', {'id': post.id})
        self.assertEqual(response.status_code, 200)

    def test_get_modal_info_status_401_error(self):
        post = self.create_new_post()
        self.client.credentials()
        response = self.client.post('/posts/info/', {'id': post.id})
        self.assertEqual(response.status_code, 401)

    def test_get_modal_info_response_is_json(self):
        post = self.create_new_post()
        response = self.client.post('/posts/info/', {'id': post.id})
        if 'post' in response.json():
            self.assertTrue(True)
        else:
            self.assertTrue(False)

    def test_get_modal_info_id_error(self):
        response = self.client.post('/posts/info/', {'id': 9999999})
        self.assertEqual(response.status_code, 400)

    def test_create_new_post(self):
        image = self.uploaded_file
        text = 'Teste de texto'
        response = self.client.post('/posts/add/', {'image': image, 'text': text})
        query = Post.objects.get(text=text)
        self.assertIsNotNone(query)
        self.assertEqual(response.status_code, 200)

    def test_create_new_post_error_401(self):
        self.client.credentials()
        response = self.client.post('/posts/add/')
        self.assertEqual(response.status_code, 401)

    # Delete post
    def test_delete_post_status_200(self):
        post = self.create_new_post()
        response = self.client.delete('/posts/del/', {'id': post.id})
        self.assertEqual(response.status_code, 200)

    def test_delete_post_status_401_error(self):
        self.client.credentials()
        response = self.client.delete('/posts/del/')
        self.assertEqual(response.status_code, 401)

    def test_delete_post_status_no_id(self):
        response = self.client.delete('/posts/del/')
        self.assertEqual(response.status_code, 404)

    def test_like_post_status_200(self):
        post = self.create_new_post()
        response = self.client.post('/posts/like/', {'id': post.id})
        self.assertEqual(response.status_code, 200)

    def test_like_post_status_401(self):
        self.client.credentials()
        response = self.client.post('/posts/del/', )
        self.assertEqual(response.status_code, 401)

    def test_like_post_id_error(self):
        response = self.client.post('/posts/like/', {'id': 9999})
        self.assertEqual(response.status_code, 404)
