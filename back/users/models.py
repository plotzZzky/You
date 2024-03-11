from django.db import models
from django.contrib.auth.models import User
import uuid
import os

from posts.models import Post


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('static/profiles/', filename)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_file_path)
    follows = models.ManyToManyField(User, related_name='users_friend', blank=True)
    likes = models.ManyToManyField(Post, blank=True)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=255)

    objects = models.Manager()

