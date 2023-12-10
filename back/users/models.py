from django.db import models
import os
import uuid

from django.contrib.auth.models import User
from posts.models import Post


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profiles/', filename)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_file_path)
    follows = models.ManyToManyField(User, related_name='users_friend', blank=True)
    likes = models.ManyToManyField(Post, blank=True)

    objects = models.Manager()
