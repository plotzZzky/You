from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
import os


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('media/profiles/', filename)


class CustomUser(AbstractUser):
    picture = models.ImageField(upload_to=get_file_path, null=True, blank=True)
    email = None  # remove o campo e-mail
    question = models.CharField(blank=False, null=False, max_length=128)
    answer = models.CharField(blank=False, null=False, max_length=128)

    followers = models.ManyToManyField('self', related_name='followers', blank=True, null=True)

    REQUIRED_FIELDS = ['question', 'answer']