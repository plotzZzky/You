from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

from users.models import Profile, Post
from .models import Comment


class CommentsTest(TestCase):
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

    def create_new_comment(self):
        post = self.create_new_post()
        comment = Comment.objects.create(
            post=post,
            text='Teste de comentario!',
            user=self.user,
        )
        return comment

    # Add Comment
    def test_add_comment_status_200(self):
        post = self.create_new_post()
        response = self.client.post('/comments/add/', {'id': post.id, 'comment': 'teste de comentario'})
        self.assertEqual(response.status_code, 200)

    def test_add_comment_status_401_error(self):
        self.client.credentials()
        response = self.client.post('/comments/add/')
        self.assertEqual(response.status_code, 401)

    def test_add_comment_status_no_id_error(self):
        response = self.client.post('/comments/add/', {'id': 999999, 'comment': 'teste de comentario'})
        self.assertEqual(response.status_code, 404)

    # Delete Comment
    def test_delete_comment_status_200(self):
        comment = self.create_new_comment()
        response = self.client.delete('/comments/del/', {'id': comment.id})
        self.assertEqual(response.status_code, 200)

    def test_delete_comment_status_401_error(self):
        self.client.credentials()
        response = self.client.delete('/comments/del/')
        self.assertEqual(response.status_code, 401)

    def test_delete_comment_no_id_error(self):
        response = self.client.delete('/comments/del/', {'id': 999999})
        self.assertEqual(response.status_code, 404)
