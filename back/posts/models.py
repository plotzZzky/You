from django.db import models
import uuid
import os

from django.contrib.auth.models import User


def get_filename(filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return filename


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.CharField()
    text = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='users_liked', blank=True)

    objects = models.Manager()
