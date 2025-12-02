from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
import os


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('profiles/', filename)


class CustomUser(AbstractUser):
    picture = models.ImageField(upload_to=get_file_path, null=True, blank=True)
    desc = models.CharField(max_length=512, null=True, blank=True, default="")
    email = None  # remove o campo email
    question = models.CharField(blank=False, null=False, max_length=128)
    answer = models.CharField(blank=False, null=False, max_length=128)

    REQUIRED_FIELDS = ['question', 'answer']