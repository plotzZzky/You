from rest_framework import routers

from .views import ChatView

chat_router = routers.SimpleRouter()
chat_router.register(r'chats', ChatView, basename='chats')
