from rest_framework import routers

from . import views


posts_router = routers.SimpleRouter()
posts_router.register(r'post', views.PostClassView, basename='post')
posts_router.register(r'like', views.LikeClassView, basename='like')
posts_router.register(r'follow', views.FollowClassView, basename='follow')

