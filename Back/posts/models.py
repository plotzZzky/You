from django.db import models
from accounts.models import CustomUser
import uuid
import os


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('media/posts/', filename)


class Post(models.Model):
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL)
    image = models.ImageField(upload_to=get_file_path, blank=True, null=True)
    text = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(CustomUser, related_name='likes', blank=True)
    liked = models.BooleanField(default=False)

    objects = models.Manager()
