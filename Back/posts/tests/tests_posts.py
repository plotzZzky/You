from tests.generic_test import AbstractGenericTests
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

from posts.models import Post


class PostsTests(AbstractGenericTests):
    basic_url = "/posts/"

    def setUp(self):
        self.create_new_user()
        self.create_new_item()

    def create_new_item(self):
        self.new_item_data = {
            "image": self.create_new_picture(),
            "text": "text de test",
        }

        self.item_data = {
            **self.new_item_data,
            "user": self.user,
        }

        post = Post.objects.create(**self.item_data)
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

    # * * * * * All posts * * * * *
    def test_get_all_posts_status(self):
        self._test_get_item_status_200()

    def test_get_all_posts_content_type(self):
        self._test_get_item_compare_content_type_json()

    # Errors
    def test_get_all_posts_no_credentials_error_403(self):
        self._test_get_item_status_403_error()

    # * * * * * Get post * * * * *
    def test_receive_post_status(self):
        self._test_get_item_status_200()

    def test_receive_post_content_type(self):
        self._test_get_item_compare_content_type_json()

    # Errors
    def test_receive_post_credentials_403_error(self):
        self._test_get_item_status_403_error()

    # * * * * * Create post * * * * *
    def test_create_new_post_status(self):
        self._test_post_item_status_200()

    def test_create_new_post_content_type(self):
        self._test_post_item_compare_content_type_json()

    # Errors
    def test_create_new_post_no_credentials_error_403(self):
        self._test_post_item_status_403_error()

    # * * * * * Delete post * * * * *
    def test_delete_post_status(self):
        self._test_delete_item_status_200()

    def test_delete_post_content_type(self):
        self._test_delete_item_compare_content_type_json()

    def test_delete_post_compare_content_value(self):
        self._test_delete_item_compare_response_content('Post deletado!')

    # Errors
    def test_delete_post_no_credentials_error_403(self):
        self._test_delete_item_status_403_error()



