from posts.tests.generic_test import AbstractGenericTests


class PostsTests(AbstractGenericTests):
    all_posts_url = "/users/"

    def setUp(self):
        self.create_new_user()

    # * * * * * All posts * * * * *
    def test_all_posts_status(self):
        self._test_get_url_status(self.all_posts_url, 200)

    def test_all_posts_content_type(self):
        self._test_get_url_compare_content_type(self.all_posts_url, 'application/json')

    # Errors
    def test_get_all_posts_no_credentials_error_403(self):
        self._test_get_url_no_token_403_error(self.all_posts_url)

    # * * * * * Lista de posts de quem você segue * * * * *
    def test_receive_post_status(self):
        self.create_another_user()
        url = f"/users/{self.another_user.id}/"
        self._test_get_url_status(url, 200)

    def test_receive_post_content_type(self):
        self.create_another_user()
        url = f"/users/{self.another_user.id}/"
        self._test_get_url_compare_content_type(url, 'application/json')

    # Errors
    def test_receive_post_credentials_403_error(self):
        self.create_another_user()
        url = f"/users/{self.another_user.id}/"
        self._test_get_url_no_token_403_error(url)
