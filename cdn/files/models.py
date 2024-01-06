from django.db import models
import os


def get_post_file_path(instance, filename):
    return os.path.join('posts/', filename)


def get_profile_file_path(instance, filename):
    return os.path.join('profiles/', filename)


class Post(models.Model):
    image = models.ImageField(upload_to=get_post_file_path)


class Profile(models.Model):
    image = models.ImageField(upload_to=get_profile_file_path)
