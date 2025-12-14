from tests.generic_test import AbstractGenericTests
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.hashers import make_password
from PIL import Image
import io

from posts.models import Post


class LikeTests(AbstractGenericTests):
    basic_url = "/like/"

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

    # * * * * * Likes * * * * *
    def test_like_post_status(self):
        self._test_get_item_status_200()

    def test_like_post_content_type(self):
        self._test_get_item_compare_content_type_json()

    def test_like_post_compare_content_value(self):
        self._test_get_item_compare_response_content("Like!")

    # * * * * * DisLikes * * * * *
    def test_dislike_post_content_type(self):
        self._test_get_item_status_200()
        self._test_get_item_compare_content_type_json()

    def test_dislike_post_compare_content_value(self):
        self._test_get_item_status_200()
        self._test_get_item_compare_response_content("Dislike!")

    # Errors
    def test_like_post_no_credentials_error_403(self):
        self._test_get_item_status_403_error()


class FollowTests(AbstractGenericTests):
    basic_url = "/follow/"
    number = 1

    def create_new_user_data(self):
        username = f"user{self.number}"
        self.number += 1

        another_user_auth = {  # Usuário extra para tests
            'username': username,
            'password': '12345678b',
            'question': 'question',
            'answer': make_password('answer'),
        }
        return another_user_auth

    def setUp(self):
        self.create_new_user()

    def create_new_item(self):
        user = self._create_new_user(self.create_new_user_data())
        return user

    # * * * * * Follow * * * * *
    def test_follow_user_status(self):
        self._test_get_item_status_200()

    def test_follow_user_content_type(self):
        self._test_get_item_compare_content_type_json()

    def test_follow_user_compare_content_value(self):
        self._test_get_item_compare_response_content("Follow!")

    # * * * * * Unfollow * * * * *
    def test_unfollow_user_content_type(self):
        self._test_get_item_status_200()
        self._test_get_item_compare_content_type_json()

    def test_unfollow_user_compare_content_value(self):
        user = self.create_new_item()
        test_url = f"/follow/{user.id}/"
        self.basic_test_get_url_status_200(test_url)
        self.basic_test_get_url_compare_response_content(test_url, "Unfollow!")

    # Errors
    def test_follow_user_no_credentials_error_403(self):
        self._test_get_item_status_403_error()
