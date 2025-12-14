from tests.generic_test import AbstractGenericTests
from django.contrib.auth.hashers import make_password


class PostsTests(AbstractGenericTests):
    basic_url = "/users/"

    number = 1

    def setUp(self):
        self.create_new_user()

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

    def create_new_item(self):
        user = self._create_new_user(self.create_new_user_data())
        return user

    # * * * * * All posts * * * * *
    def test_all_posts_status(self):
        self.basic_test_get_url_status_200(self.basic_url)

    def test_all_posts_content_type(self):
        self.basic_test_get_url_compare_content_type_json(self.basic_url)

    # Errors
    def test_get_all_posts_no_credentials_error_403(self):
        self._test_get_item_status_403_error()

    # * * * * * Lista de posts de quem você segue * * * * *
    def test_receive_post_status(self):
        self.basic_test_get_url_status_200(self.basic_url)

    def test_receive_post_content_type(self):
        self.basic_test_get_url_compare_content_type_json(self.basic_url)

    # Errors
    def test_receive_post_credentials_403_error(self):
        self._test_get_item_status_403_error()

    def test_get_all_posts_id_404_error(self):
        self._test_get_all_id_status_404_error(self.basic_url, ['id', '#', ' ', '999999', '-1'])
