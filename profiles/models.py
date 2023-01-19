import os
from django.db import models

from django.contrib.auth.models import User


def content_file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.user.id, ext)
    return os.path.join('posts/', filename)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=content_file_name, blank=True, null=True)
    text = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='users_liked')


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
