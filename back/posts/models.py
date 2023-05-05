from django.db import models
import uuid
import os

from django.contrib.auth.models import User


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('posts/', filename)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_file_path)
    text = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='users_liked', blank=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    text = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
