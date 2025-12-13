from accounts.tests.generic_test import AbstractGenericTests


class RegisterTest(AbstractGenericTests):

    def test_register_status(self):
        self._test_post_url_status(self.register_url, self.register_auth, 200)

    def test_register_content_type(self):
        self._test_response_content_type(self.register_url, self.register_auth, None)

    # Errors
    def test_post_register_no_data_error(self):
        self._test_post_url_status(self.register_url, {}, 500)

    def test_register_status_error_username(self):
        self.register_auth['username'] = 'incorrect_user'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_no_username(self):
        del self.register_auth['username']
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_username_only_numbers(self):
        self.register_auth['username'] = 12345
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_password(self):
        self.register_auth['password'] = '123'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_password_no_letter(self):
        self.register_auth['password'] = '12345678'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_password_no_number(self):
        self.register_auth['password'] = 'abcdefghi'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_no_password(self):
        del self.register_auth['password']
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_pwd(self):
        self.register_auth['pwd'] = '123'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_no_pwd(self):
        del self.register_auth['pwd']
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_question(self):
        self.register_auth['question'] = '123'
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_no_question(self):
        del self.register_auth['question']
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_register_status_error_answer(self):
        self.register_auth['answer'] = '123'
        self._test_post_url_status(self.register_url, self.register_auth, 400)

    def test_register_status_error_no_answer(self):
        del self.register_auth['answer']
        self._test_post_url_status(self.register_url, self.register_auth, 500)

    def test_get_register_status_error_404(self):
        url = f"{self.register_url}/1/"
        self._test_get_url_status(url, self.register_auth, 404)

    def test_get_register_status_error_405(self):
        self._test_get_url_status(self.register_url, self.register_auth, 405)

    def test_put_register_status_error_404(self):
        url = f"{self.register_url}/1/"
        self._test_put_url_status(url, self.register_auth, 404)

    def test_put_register_status_error_405(self):
        self._test_put_url_status(self.register_url, self.register_auth, 405)

    def test_patch_register_status_error_404(self):
        url = f"{self.register_url}/1/"
        self._test_patch_url_status(url, self.register_auth, 404)

    def test_patch_register_status_error_405(self):
        self._test_patch_url_status(self.register_url, self.register_auth, 405)

    def test_delete_register_status_error_404(self):
        url = f"{self.register_url}/1/"
        self._test_delete_url_status(url, self.register_auth, 404)

    def test_delete_register_status_error_405(self):
        self._test_delete_url_status(self.register_url, self.register_auth, 405)
