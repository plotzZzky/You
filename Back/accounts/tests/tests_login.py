
from accounts.tests.generic_test import AbstractGenericTests


class LoginTest(AbstractGenericTests):
    """ Testa o endpoint de login """
    def setUp(self):
        self.create_new_user()

    def test_login_status(self):
        self._test_post_url_status(self.login_url, self.login_auth, 200)

    def test_login_content_type(self):
        self._test_response_content_type(self.login_url, self.login_auth, None)

    # Errors
    def test_login_incorrect_user_status_error(self):
        self._test_post_url_status(self.login_url, self.register_auth_error, 401)

    def test_login_empty_username_status_error(self):
        data = self.login_auth.copy()
        data['username'] = ''
        self._test_post_url_status(self.login_url, data, 401)

    def test_login_no_username_status_error(self):
        data = self.login_auth.copy()
        del data['username']
        self._test_post_url_status(self.login_url, data, 500)

    def test_login_empty_password_status_error(self):
        data = self.login_auth.copy()
        data['password'] = ''
        self._test_post_url_status(self.login_url, data, 401)

    def test_login_no_password_status_error(self):
        data = self.login_auth.copy()
        del data['password']
        self._test_post_url_status(self.login_url, data, 500)

    def test_login_no_data_status_error(self):
        self._test_post_url_status(self.login_url, {}, 500)

    def test_put_login_status_error_404(self):
        url = f"{self.login_url}/1/"
        self._test_put_url_status(url, self.login_auth, 404)

    def test_put_login_status_error_405(self):
        self._test_put_url_status(self.login_url, self.login_auth, 405)

    def test_patch_login_status_error_404(self):
        url = f"{self.login_url}/1/"
        self._test_patch_url_status(url, self.login_auth, 404)

    def test_patch_login_status_error_405(self):
        self._test_patch_url_status(self.login_url, self.login_auth, 405)

    def test_delete_login_status_error_404(self):
        url = f"{self.login_url}/1/"
        self._test_delete_url_status(url, self.login_auth, 404)

    def test_delete_login_status_error_405(self):
        self._test_delete_url_status(self.login_url, self.login_auth, 405)

    """ Testa o endpoint me (usado pelo front para verificar o token) """
    def test_me_status(self):
        self._test_get_url_status(self.login_url, self.login_auth, 200)

    def test_me_content_type(self):
        self._test_response_content_type(self.login_url, self.login_auth, None)
