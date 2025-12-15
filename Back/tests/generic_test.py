from tests.basic_tests import AbstractBasicTests
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient

from accounts.models import CustomUser
from accounts.token import create_new_token


class AbstractGenericTests(AbstractBasicTests):
    login_url: str = "/auth/login/"
    me_url: str = "/auth/login/"

    register_url: str = "/auth/register/"

    recovery_url: str = "/auth/recovery"
    update_url: str = "/auth/recovery/update/"

    basic_url: str = "/item/"
    item_url: str = ""

    login_auth = {
        'username': 'temporary',
        'password': '1234567a',
    }

    new_user_auth = {  # Usuário básico para tests
        **login_auth,
        'question': 'question',
        'answer': make_password('answer'),
    }

    user = None

    another_user_auth = {  # Usuário extra para tests
        'username': 'another',
        'password': '12345678b',
        'pwd': '12345678b',
        'question': 'question',
        'answer': make_password('answer'),
    }

    another_user = None

    new_item_data = {}
    updated_item_data = {}

    # * * * * * * Create user * * * * * *
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

    # * * * * * * Item * * * * * *
    def create_new_item(self):
        # Usado para tests de create
        item = None
        return item

    # * * * * * * Item tests 200 * * * * * *
    def _test_get_item_status_200(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_get_url_status_200(test_url)

    def _test_post_item_status_200(self):
        self.basic_test_post_url_status_200(self.basic_url, self.new_item_data)

    def _test_patch_item_status_200(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_patch_url_status_200(test_url, self.updated_item_data)

    def _test_put_item_status_200(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_put_url_status_200(test_url, self.updated_item_data)

    def _test_delete_item_status_200(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_delete_url_status_200(test_url)

    # * * * * * * Item tests 201 * * * * * *
    def _test_post_item_status_201(self):
        self.basic_test_post_url_status_201(self.basic_url, self.new_item_data)

    # * * * * * * Item tests 401 * * * * * *
    def _test_get_item_status_401_error(self):
        self.basic_test_get_url_status_401_error(self.basic_url)

    def _test_post_item_status_401_error(self):
        self.basic_test_post_url_status_401_error(self.basic_url, self.new_item_data)

    def _test_patch_item_status_401_error(self):
        self.basic_test_patch_url_status_401_error(self.basic_url, self.new_item_data)

    def _test_put_item_status_401_error(self):
        self.basic_test_put_url_status_401_error(self.basic_url, self.new_item_data)

    def _test_delete_item_status_401_error(self):
        self.basic_test_delete_url_status_401_error(self.basic_url)

    # * * * * * * Item tests 405 error * * * * * *
    def _test_get_item_status_403_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_get_url_no_token_403_error(test_url)

    def _test_post_item_status_403_error(self):
        self.basic_test_post_url_no_token_403_error(self.basic_url, {})

    def _test_patch_item_status_403_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_patch_url_no_token_403_error(test_url, {})

    def _test_put_item_status_403_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_put_url_no_token_403_error(test_url, {})

    def _test_delete_item_status_403_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_delete_url_no_token_403_error(test_url)

    # * * * * * * Item tests 404 * * * * * *
    def _test_get_all_id_status_404_error(self, test_url, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self.basic_test_get_url_status(url, 404)

    def _test_patch_all_id_status_404_error(self, test_url, request_data, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self.basic_test_patch_url_status(url, request_data, 404)

    def _test_put_all_id_status_404_error(self, test_url, request_data, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self.basic_test_put_url_status(url, request_data, 404)

    def _test_delete_all_id_status_404_error(self, test_url, ids_list: list):
        for _id in ids_list:
            url: str = f"{test_url}/{_id}/"
            self.basic_test_delete_url_status(url, 404)

    # * * * * * * Item tests 405 error * * * * * *
    def _test_get_item_status_405_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_get_url_status_405_error(test_url)

    def _test_get_all_item_status_405_error(self): # type: ignore
        self.basic_test_get_url_status_405_error(self.basic_url)

    def _test_post_item_status_405_error(self):
        self.basic_test_post_url_status_405_error(self.basic_url, {})

    def _test_patch_item_status_405_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_patch_url_status_405_error(test_url, {})

    def _test_put_item_status_405_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_put_url_status_405_error(test_url, {})

    def _test_delete_item_status_405_error(self):
        test_url: str = f"{self.basic_url}1/"  # type: ignore
        self.basic_test_delete_url_status_405_error(test_url)

    # * * * * * * Item tests 405 * * * * * *
    def _test_get_item_status_500_error(self):
        self.basic_test_get_url_status_500_error(self.basic_url)

    def _test_post_item_status_500_error(self):
        self.basic_test_post_url_status_500_error(self.basic_url, self.new_item_data)

    def _test_patch_item_status_500_error(self):
        self.basic_test_patch_url_status_500_error(self.basic_url, self.new_item_data)

    def _test_put_item_status_500_error(self):
        self.basic_test_put_url_status_500_error(self.basic_url, self.new_item_data)

    def _test_delete_item_status_500_error(self):
        self.basic_test_delete_url_status_500_error(self.basic_url)

    # * * * * * * Item content type json test * * * * * *
    def _test_get_item_compare_content_type_json(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_get_url_compare_content_type_json(test_url)

    def _test_post_item_compare_content_type_json(self):
        self.basic_test_post_url_compare_content_type_json(self.basic_url, self.new_item_data)

    def _test_patch_item_compare_content_type_json(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_patch_url_compare_content_type_json(test_url, self.updated_item_data)

    def _test_put_item_compare_content_type_json(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_put_url_compare_content_type_json(test_url, self.updated_item_data)

    def _test_delete_item_compare_content_type_json(self):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_delete_url_compare_content_type_json(test_url)

    # * * * * * * Item compare content type test * * * * * *
    def _test_get_item_compare_response_content(self, value):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_get_url_compare_response_content(test_url, value)

    def _test_post_item_compare_response_content(self, value):
        self.basic_test_post_url_compare_response_content(self.basic_url, self.new_item_data, value)

    def _test_patch_item_compare_response_content(self, value):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_patch_url_compare_response_content(test_url, self.updated_item_data, value)

    def _test_put_item_compare_response_content(self, value):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_put_url_compare_response_content(test_url, self.updated_item_data, value)

    def _test_delete_item_compare_response_content(self, value):
        item = self.create_new_item()
        test_url: str = f"{self.basic_url}{item.id}/"  # type: ignore
        self.basic_test_delete_url_compare_response_content(test_url, value)