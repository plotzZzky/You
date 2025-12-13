from posts.tests.generic_test import AbstractGenericTests


class LikeTest(AbstractGenericTests):

    def setUp(self):
        self.create_new_user()

    # * * * * * Likes * * * * *
    def test_like_post_status(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_status(url, 200)

    def test_like_post_content_type(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_compare_content_type(url, 'application/json')

    def test_like_post_compare_content_value(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_compare_response_content(url, "Like!")

    # Errors
    def test_like_post_no_credentials_error_403(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_no_token_403_error(url)

    # * * * * * DisLikes * * * * *
    def test_dislike_post_content_type(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_status(url, 200)
        self._test_get_url_compare_content_type(url, 'application/json')

    def test_dislike_post_compare_content_value(self):
        self.create_new_post()
        url = f'/like/{self.post.id}/'
        self._test_get_url_status(url, 200)
        self._test_get_url_compare_response_content(url, "Dislike!")

    # * * * * * Follow * * * * *
    def test_follow_user_status(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_status(url, 200)

    def test_follow_user_content_type(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_compare_content_type(url, 'application/json')

    def test_follow_user_compare_content_value(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_compare_response_content(url, "Follow!")

    # Errors
    def test_follow_user_no_credentials_error_403(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_no_token_403_error(url)

    # * * * * * Unfollow * * * * *
    def test_unfollow_user_content_type(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_status(url, 200)
        self._test_get_url_compare_content_type(url, 'application/json')

    def test_unfollow_user_compare_content_value(self):
        self.create_another_user()
        url = f'/follow/{self.another_user.id}/'
        self._test_get_url_status(url, 200)
        self._test_get_url_compare_response_content(url, "Unfollow!")

