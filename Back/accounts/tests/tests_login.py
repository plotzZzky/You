from tests.generic_test import AbstractGenericTests


class LoginTests(AbstractGenericTests):
    """ Testa o endpoint de login """
    basic_url = '/auth/login/'

    login_auth = {
        'username': 'temporary',
        'password': '1234567a',
    }
    auth_error = {
        'username': 'fake',
        'password': '1234567b',
    }

    def setUp(self):
        self.create_new_user()

    def test_login_status(self):
        self.new_item_data = self.login_auth
        self._test_post_item_status_200()

    def test_login_content_type(self):
        self._test_post_item_compare_content_type_json()

    # Errors
    def test_login_incorrect_user_status_error(self):
        self.new_item_data = self.auth_error # Passa o dict para a função que faz a consulta
        self._test_post_item_status_401_error()

    def test_login_empty_username_status_error(self):
        self.new_item_data = self.login_auth.copy()
        self.new_item_data['username'] = ''
        self._test_post_item_status_401_error()

    def test_login_no_username_status_error(self):
        self.new_item_data = self.login_auth.copy()
        del self.new_item_data['username']
        self._test_post_item_status_500_error()

    def test_login_empty_password_status_error(self):
        self.new_item_data = self.login_auth.copy()
        self.new_item_data['password'] = ''
        self._test_post_item_status_401_error()

    def test_login_no_password_status_error(self):
        self.new_item_data = self.login_auth.copy()
        del self.new_item_data['password']
        self._test_post_item_status_500_error()

    def test_login_no_data_status_error(self):
        self.new_item_data = {}
        self._test_post_item_status_500_error()

    def test_put_login_status_error_405(self):
        self._test_put_item_status_405_error()

    def test_patch_login_status_error_404(self):
        self._test_patch_item_status_405_error()

    def test_delete_login_status_error_405(self):
        self._test_patch_item_status_405_error()

    """ Testa o endpoint me (usado pelo front para verificar o token) """
    def test_me_status(self):
        self.new_item_data = self.login_auth
        self.basic_test_get_url_status_200(self.basic_url)

    def test_me_content_type(self):
        self.new_item_data = self.login_auth
        self.basic_test_get_url_compare_content_type_json(self.basic_url)
