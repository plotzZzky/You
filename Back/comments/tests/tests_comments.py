from tests.generic_test import AbstractGenericTests
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

from comments.models import Comment, Post


class CommentsTest(AbstractGenericTests):
    basic_url: str = "/comments/"
    item_url: str = ""

    def setUp(self):
        self.create_new_user()
        self.create_new_item() # Cria um novo comentário para ser retornado

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

    def create_new_post_data(self):
        data = {
            "image": self.create_new_picture(),
            "text": "text de test",
            "user": self.user,
        }

        return data

    def generic_create_new_post(self):
        post_data = self.create_new_post_data()
        post = Post.objects.create(**post_data)
        post.save()
        return post

    def create_new_post(self):
        # Usado para tests de create
        post = self.generic_create_new_post()
        self.item_url = f"{self.basic_url}{post.id}/"  # /comments/post_id/
        return post

    def create_new_item(self):
        post = self.create_new_post()

        self.item_data = {  # Cria o json para ser usado no create
            "text": "comment",
            "post": post.id,
        }

        comment = {
            "text": "comment",
            "post": post,
            "user": self.user,
        }
        comment = Comment.objects.create(**comment)
        comment.save()
        return comment

    # * * * * * Get comments * * * * *
    def test_get_all_comments_status(self):
        self._test_get_all_item_status_405_error()

    def test_get_comment_status(self):
        comment = self.create_new_item()
        test_url: str = f"{self.basic_url}{comment.post.id}/"
        self.basic_test_get_url_status_200(test_url)

    def test_get_comment_content_type(self):
        comment = self.create_new_item()
        test_url: str = f"{self.basic_url}{comment.post.id}/"
        self.basic_test_get_url_compare_content_type_json(test_url)

    def test_get_comment_no_credentials_403_error(self):
        self._test_get_item_status_403_error()

    # * * * * * Create comments * * * * *
    def test_create_comment_status(self):
        self._test_post_item_status_200()

    def test_create_comment_content_type(self):
        self._test_post_item_compare_content_type_json()

    def test_create_comment_no_credentials_403_error(self):
        self._test_get_item_status_403_error()

    # * * * * * Delete comments * * * * *
    def test_delete_comment_status(self):
        self._test_delete_item_status_200()

    def test_delete_comment_content_type(self):
        self._test_delete_item_compare_content_type_json()

    def test_delete_comment_response_content(self):
        self._test_delete_item_compare_response_content("Comentario deletado!")

    def test_delete_comment_no_credentials_403_error(self):
        self._test_delete_item_status_403_error()
