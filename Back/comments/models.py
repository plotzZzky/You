from django.db import models
from posts.models import Post
from accounts.models import CustomUser


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    text = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True, null=True, blank=True)

    objects = models.Manager()
