from comments.tests.generic_test import AbstractGenericTests
from comments.models import Comment


class CommentsTest(AbstractGenericTests):
    comments_url = '/comments/'
    comment = ""

    def setUp(self):
        self.create_new_user()
        self.create_new_post()
        self.comment_data = {
            "text": "comment",
            "post": self.post.id,
        }

    def create_new_comment(self):
        self.create_comment_data = {
            "text": "comment",
            "post": self.post,
            "user": self.user,
        }
        comment = Comment.objects.create(**self.create_comment_data)
        comment.save()
        return comment

    # * * * * * Get comments * * * * *
    def test_get_all_comments_status(self):
        self._test_get_url_status(self.comments_url, 405)

    def test_get_comments_status(self):
        url = f"/comments/{self.post.id}/"
        self._test_get_url_status(url, 200)

    def test_get_comments_content_type(self):
        url = f"/comments/{self.post.id}/"
        self._test_get_url_compare_content_type(url, "application/json")

    def test_get_comment_no_credentials_403_error(self):
        url = f"/comments/{self.post.id}/"
        self._test_get_url_no_token_403_error(url)

    # * * * * * Create comments * * * * *
    def test_create_comment_status(self):
        self._test_post_url_status(self.comments_url, self.comment_data, 200)

    def test_create_comment_content_type(self):
        self._test_post_url_compare_content_type(self.comments_url, self.comment_data, "application/json")

    def test_create_comment_no_credentials_403_error(self):
        self._test_get_url_no_token_403_error(self.comments_url)

    # * * * * * Delete comments * * * * *
    def test_delete_comment_status(self):
        comment = self.create_new_comment()
        url = f"/comments/{comment.id}/"
        self._test_delete_url_status(url, 200)

    def test_delete_comment_content_type(self):
        comment = self.create_new_comment()
        url = f"/comments/{comment.id}/"
        self._test_delete_url_compare_content_type(url, "application/json")

    def test_delete_comment_no_credentials_403_error(self):
        url = f"/comments/1/"
        self._test_delete_url_no_token_403_error(url)



