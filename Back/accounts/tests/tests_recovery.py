from accounts.tests.generic_test import AbstractGenericTests


class RecoveryTest(AbstractGenericTests):
    def setUp(self):
        self.create_new_user()

    def test_receive_question_status(self):
        data = {"username": 'temporary'}
        self._test_post_url_status(self.recovery_url, data, 200)

    def test_receive_question_content_type(self):
        data = {"username": 'temporary'}
        self._test_response_content_type(self.recovery_url, data, "application/json")

    def test_receive_question_content(self):
        data = {"username": 'temporary'}
        self._test_compare_response_content(self.recovery_url, data, {"question": "question"})

    def test_receive_question_no_data_error(self):
        self._test_post_url_status(self.recovery_url, {}, 500)

    def test_receive_question_incorrect_username_error(self):
        data = {"username": 'incorrect'}
        self._test_post_url_status(self.recovery_url, data, 500)

    def test_get_recovery_status_error_404(self):
        url = f"{self.recovery_url}/1/"
        self._test_get_url_status(url, self.register_auth, 404)

    def test_get_recovery_status_error_405(self):
        self._test_get_url_status(self.recovery_url, self.register_auth, 405)

    def test_put_recovery_status_error_404(self):
        url = f"{self.recovery_url}/1/"
        self._test_put_url_status(url, self.register_auth, 404)

    def test_put_recovery_status_error_405(self):
        self._test_put_url_status(self.recovery_url, self.register_auth, 405)

    def test_patch_recovery_status_error_404(self):
        url = f"{self.recovery_url}/1/"
        self._test_patch_url_status(url, self.register_auth, 404)

    def test_patch_recovery_status_error_405(self):
        self._test_patch_url_status(self.recovery_url, self.register_auth, 405)

    def test_delete_recovery_status_error_404(self):
        url = f"{self.recovery_url}/1/"
        self._test_delete_url_status(url, self.register_auth, 404)

    def test_delete_recovery_status_error_405(self):
        self._test_delete_url_status(self.recovery_url, self.register_auth, 405)

    """ Teste do recovery password (/auth/recovery/set/) """
    def test_set_pwd_status(self):
        self._test_post_url_status(self.set_pwd_url, self.register_auth, 200)

    def test_set_pwd_content(self):
        self._test_response_content_type(self.set_pwd_url, self.register_auth, None)

    def test_set_pwd_no_password_status_200(self):
        data = self.register_auth.copy()
        del data['password']
        self._test_post_url_status(self.set_pwd_url, data, 200)

    def test_set_pwd_no_pwd_status_200(self):
        data = self.register_auth.copy()
        del data['pwd']
        self._test_post_url_status(self.set_pwd_url, data, 200)

    def test_set_pwd_no_answer_status_200(self):
        data = self.register_auth.copy()
        del data['answer']
        self._test_post_url_status(self.set_pwd_url, data, 200)

    def test_set_pwd_incorrect_answer_status_200(self):
        data = self.register_auth.copy()
        data['answer'] = 'incorrect'
        self._test_post_url_status(self.set_pwd_url, data, 200)

    # Errors
    def test_set_pwd_no_data_error(self):
        self._test_post_url_status(self.set_pwd_url, {}, 500)

    def test_set_pwd_empty_username_status_error(self):
        data = self.register_auth.copy()
        data['username'] = ''
        self._test_post_url_status(self.set_pwd_url, data, 500)

    def test_set_pwd_no_username_status_error(self):
        data = self.register_auth.copy()
        del data['username']
        self._test_post_url_status(self.set_pwd_url, data, 500)

    def test_set_pwd_empty_password_status_error(self):
        data = self.register_auth.copy()
        data['password'] = ''
        self._test_post_url_status(self.set_pwd_url, data, 400)

    def test_set_pwd_empty_pwd_status_error(self):
        data = self.register_auth.copy()
        data['pwd'] = ''
        self._test_post_url_status(self.set_pwd_url, data, 400)

    def test_set_pwd_empty_answer_status_error(self):
        data = self.register_auth.copy()
        data['answer'] = ''
        self._test_post_url_status(self.set_pwd_url, data, 400)

    def test_get_set_pwd_status_error_404(self):
        url = f"{self.set_pwd_url}/1/"
        self._test_get_url_status(url, self.register_auth, 404)

    def test_get_set_pwd_status_error_405(self):
        self._test_get_url_status(self.set_pwd_url, self.register_auth, 405)

    def test_put_set_pwd_status_error_404(self):
        url = f"{self.set_pwd_url}/1/"
        self._test_put_url_status(url, self.register_auth, 404)

    def test_put_set_pwd_status_error_405(self):
        self._test_put_url_status(self.set_pwd_url, self.register_auth, 405)

    def test_patch_set_pwd_status_error_404(self):
        url = f"{self.set_pwd_url}/1/"
        self._test_patch_url_status(url, self.register_auth, 404)

    def test_patch_set_pwd_status_error_405(self):
        self._test_patch_url_status(self.set_pwd_url, self.register_auth, 405)

    def test_delete_set_pwd_status_error_404(self):
        url = f"{self.set_pwd_url}/1/"
        self._test_delete_url_status(url, self.register_auth, 404)

    def test_delete_set_pwd_status_error_405(self):
        self._test_delete_url_status(self.set_pwd_url, self.register_auth, 405)