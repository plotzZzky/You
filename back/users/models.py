from django.db import models
from django.contrib.auth.models import User

import uuid
from posts.models import Post


def get_filename(filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return filename


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.CharField(null=True, blank=True)
    follows = models.ManyToManyField(User, related_name='users_friend', blank=True)
    likes = models.ManyToManyField(Post, blank=True)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=255)

    objects = models.Manager()

