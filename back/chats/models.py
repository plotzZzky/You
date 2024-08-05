from django.db import models

from django.contrib.auth.models import User


class ChatModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_friend')

    objects = models.Manager()


class MessageModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend')
    msg = models.CharField()
    date = models.DateTimeField(auto_created=True)

    objects = models.Manager()
