from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .models import ChatModel
from .serializers import ChatSerializer


class ChatView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = ChatSerializer
    queryset = ChatModel.objects.all()

    def list(self, request, *args, **kwargs):
        chats = ChatModel.objects.filter(user=request.user)
        serializer = self.serializer_class(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        chat_id = kwargs['pk']
        chat = ChatModel.objects.get(pk=chat_id)
        serializer = self.serializer_class(chat)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            friend_id = request.data['friendId']
            friend = User.objects.get(pk=friend_id)
            
            return Response(status=status.HTTP_200_OK)
        except (KeyError, ValueError, TypeError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        chat_id = kwargs['pk']
        chat = ChatModel.objects.get(pk=chat_id)
        chat.delete()

        return Response(status=status.HTTP_200_OK)
