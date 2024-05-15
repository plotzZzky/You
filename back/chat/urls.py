from rest_framework import routers

from .views import ChatView

chat_router = routers.SimpleRouter()
chat_router.register(r'chat', ChatView, basename='chat')
