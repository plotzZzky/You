from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile

from .models import Post, Comment
from users.models import Profile


class PostsTest(TestCase):
    def setUp(self):
        self.credentials = {
            'username': 'temporary',
            'password': '1234x567'}
        self.client = APIClient()
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)  # type:ignore
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.image = SimpleUploadedFile("media/posts/1a471777-1de5-4364-bbae-420cda72dec8.png", b"file_content",
                                        content_type="image/png")
        self.profile = self.create_profile()

    def create_simple_post(self):
        data = {"text": "Test de post", "image": self.image}
        self.client.post('/posts/add/', data)
        return Post.objects.get(text=data['text'])  # type:ignore

    def create_profile(self):
        profile = Profile(user=self.user, image=self.image)
        profile.save()
        return profile

    def create_simple_comment(self):
        post = self.create_simple_post()
        comment = Comment(text='Teste de comentario', post_id=post.id, user_id=self.user.id)
        comment.save()
        return comment

    # Create post
    # Teste retorna 300 pq a imagem do teste é nula
    def test_create_post_status(self):
        data = {"text": "Test de post", "image": self.image}
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 300)

    def test_create_post_content(self):
        data = {"text": "Test de post", "image": self.image}
        self.client.post('/posts/add/', data)
        result = Post.objects.get(text="Test de post")  # type:ignore
        self.assertTrue(result)

    def test_create_post_no_login(self):
        data = {"text": "Test de post", "image": self.image}
        self.client.logout()
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 401)

    def test_create_post_empty_text(self):
        data = {"text": "", "image": self.image}
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 300)

    def test_create_post_no_text_error_404(self):
        data = {"image": self.image}
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 404)

    # Test não funciona
    def test_create_post_image_empty_error(self):
        data = {"text": "Teste", "image": ""}
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 300)

    def test_create_post_no_image_error_404(self):
        data = {"text": "Teste"}
        response = self.client.post('/posts/add/', data)
        self.assertEqual(response.status_code, 404)

    # Delete post
    def test_delete_post_status(self):
        query = self.create_simple_post()
        response = self.client.delete(f'/posts/del/id={query.id}/')
        self.assertEqual(response.status_code, 200)

    def test_delete_post_content(self):
        query = self.create_simple_post()
        self.client.delete(f'/posts/del/id={query.id}/')
        try:
            result = Post.objects.get(text=query.id)  # type:ignore
        except Post.DoesNotExist:  # type:ignore
            result = None
        self.assertIsNone(result)

    def test_delete_post_error_404(self):
        response = self.client.delete(f'/posts/del/id={9999999999}/')
        self.assertEqual(response.status_code, 404)

    def test_delete_post_error_empty(self):
        response = self.client.delete(f'/posts/del/id=/')
        self.assertEqual(response.status_code, 404)

    # Get Posts
    def test_get_friends_posts_status(self):
        response = self.client.get(f'/posts/')
        self.assertEqual(response.status_code, 200)

    def test_get_friends_posts_content(self):
        response = self.client.get(f'/posts/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_your_posts_status(self):
        response = self.client.get(f'/posts/your/')
        self.assertEqual(response.status_code, 200)

    def test_get_your_posts_content(self):
        response = self.client.get(f'/posts/your/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_all_posts_status(self):
        response = self.client.get(f'/posts/all/')
        self.assertEqual(response.status_code, 200)

    def test_get_all_posts_content(self):
        response = self.client.get(f'/posts/all/')
        self.assertEqual(response['Content-Type'], 'application/json')

    # Modal
    def test_get_modal_info_status(self):
        post = self.create_simple_post()
        response = self.client.get(f'/posts/info/id={post.id}/')
        self.assertEqual(response.status_code, 200)

    def test_get_modal_info_content(self):
        post = self.create_simple_post()
        response = self.client.get(f'/posts/info/id={post.id}/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_get_modal_info_404(self):
        response = self.client.get(f'/posts/info/id={9999999999999}/')
        self.assertEqual(response.status_code, 404)

    # Likes
    def test_like_status(self):
        post = self.create_simple_post()
        response = self.client.get(f'/posts/like/id={post.id}/')
        self.assertEqual(response.status_code, 200)

    def test_like_status_404(self):
        response = self.client.get(f'/posts/like/id={99999999}/')
        self.assertEqual(response.status_code, 404)

    # Follow
    def test_follow_status(self):
        credentials = {
            'username': 'anotherUser',
            'password': 'password'
        }
        new_user = User.objects.create_user(credentials)
        response = self.client.get(f'/posts/follow/id={new_user.id}/')
        self.assertEqual(response.status_code, 200)

    def test_follow_status_404(self):
        response = self.client.get(f'/posts/follow/id={99999999}/')
        self.assertEqual(response.status_code, 404)

    def test_follow_you_status_300(self):
        response = self.client.get(f'/posts/follow/id={self.user.id}/')
        self.assertEqual(response.status_code, 300)

    # Comments
    def test_create_comment_status(self):
        post = self.create_simple_post()
        data = {"comment": 'Comment'}
        response = self.client.post(f'/posts/comment/add/id={post.id}/', data)
        self.assertEqual(response.status_code, 200)

    def test_create_comment_content(self):
        post = self.create_simple_post()
        data = {"comment": 'Comment'}
        self.client.post(f'/posts/comment/add/id={post.id}/', data)
        try:
            comment = Comment.objects.get(text=data['comment'])  # type:ignore
        except Comment.DoesNotExist:  # type:ignore
            comment = None
        self.assertIsNotNone(comment)

    def test_create_comment_empty(self):
        post = self.create_simple_post()
        data = {"comment": ""}
        self.client.post(f'/posts/comment/add/id={post.id}/', data)
        try:
            comment = Comment.objects.get(text=data['comment'])  # type:ignore
        except Comment.DoesNotExist:  # type:ignore
            comment = None
        self.assertIsNotNone(comment)

    def test_create_comment_empty_error(self):
        post = self.create_simple_post()
        data = {}
        response = self.client.post(f'/posts/comment/add/id={post.id}/', data)
        self.assertEqual(response.status_code, 404)

    def test_delete_comment_status(self):
        comment = self.create_simple_comment()
        response = self.client.delete(f'/posts/comment/del/id={comment.id}/')  # type:ignore
        self.assertEqual(response.status_code, 200)

    def test_delete_comment_content(self):
        comment = self.create_simple_comment()
        self.client.delete(f'/posts/comment/del/id={comment.id}/')  # type:ignore
        try:
            query = Comment.objects.get(text=comment.text)  # type:ignore
        except Comment.DoesNotExist:  # type:ignore
            query = None
        self.assertIsNone(query)

    def test_delete_comment_error_404(self):
        response = self.client.delete(f'/posts/comment/del/id={99999999}/')  # type:ignore
        self.assertEqual(response.status_code, 404)
