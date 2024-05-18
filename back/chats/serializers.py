from rest_framework import serializers

from .models import ChatModel, MessageModel


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageModel
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    comments = MessageSerializer(many=True)

    class Meta:
        model = ChatModel
        fields = ['user', 'to', 'messages', 'date']
