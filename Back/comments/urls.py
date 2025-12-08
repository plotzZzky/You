from rest_framework import routers

from . import views


comments_router = routers.DefaultRouter()
comments_router.register(r'comments', views.CommentClassView, basename='comments')
