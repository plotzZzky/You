from posts.tests.generic_test import AbstractGenericTests
from posts.models import Post
from posts.serializers import SimplePostSerializer, FullPostSerializer


class PostsTests(AbstractGenericTests):
    all_posts_url = "/posts/"

    def setUp(self):
        self.create_new_user()

    # * * * * * All posts * * * * *
    def test_all_posts_status(self):
        self._test_get_url_status(self.all_posts_url, 200)

    def test_all_posts_content_type(self):
        self._test_get_url_compare_content_type(self.all_posts_url, 'application/json')

    def test_get_all_posts_compare_content_value(self):
        posts = Post.objects.exclude(user=self.user).order_by("-id")
        serializer = SimplePostSerializer(posts, many=True)
        self._test_get_url_compare_response_content(self.all_posts_url, serializer.data)

    # Errors
    def test_get_all_posts_no_credentials_error_403(self):
        self._test_get_url_no_token_403_error(self.all_posts_url)

    # * * * * * Get post * * * * *
    def test_receive_post_status(self):
        self.create_new_post()
        self._test_get_url_status(self.post_url, 200)

    def test_receive_post_content_type(self):
        self.create_new_post()
        self._test_get_url_compare_content_type(self.post_url, 'application/json')

    def test_receive_post_compare_content_value(self):
        self.create_new_post()
        serializer = FullPostSerializer(self.post)
        data = serializer.data # copia do do serialize.data mas editável
        data['image'] = 'http://testserver' + data['image'] # url completa
        self._test_get_url_compare_response_content(self.post_url, data)

    # Errors
    def test_receive_post_credentials_403_error(self):
        self.create_new_post()
        self._test_get_url_no_token_403_error(self.post_url)

    # * * * * * Create post * * * * *
    def test_create_new_post_status(self):
        data = self.create_post_data()
        self._test_post_url_status(self.all_posts_url, data, 200)

    def test_create_new_post_content_type(self):
        data = self.create_post_data()
        self._test_post_url_compare_content_type(self.all_posts_url, data, 'application/json')

    def test_create_new_post_compare_content_value(self):
        posts = Post.objects.exclude(user=self.user).order_by("-id")
        serializer = SimplePostSerializer(posts, many=True)
        data = self.create_post_data()
        self._test_post_url_compare_response_content(self.all_posts_url, data, serializer.data)

    # Errors
    def test_create_new_post_no_credentials_error_403(self):
        self._test_post_url_no_token_403_error(self.all_posts_url, {})

    # * * * * * Delete post * * * * *
    def test_delete_post_status(self):
        self.create_new_post()
        self._test_delete_url_status(self.post_url, 200)

    def test_delete_post_content_type(self):
        self.create_new_post()
        self._test_delete_url_compare_content_type(self.post_url, 'application/json')

    def test_delete_post_compare_content_value(self):
        self.create_new_post()
        self._test_delete_url_compare_response_content(self.post_url, 'Post deletado!')

    # Errors
    def test_delete_post_no_credentials_error_403(self):
        self._test_delete_url_no_token_403_error(self.all_posts_url)



