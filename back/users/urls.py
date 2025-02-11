from rest_framework import routers

from . import views


user_router = routers.DefaultRouter()
user_router.register(r'register', views.UserView, basename='register')
