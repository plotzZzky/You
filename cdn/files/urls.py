from django.urls import path

from . import views

urlpatterns = [
    path('post/', views.add_post, name='add_post'),
    path('profile/', views.add_profile_picture, name='add_profile_picture'),
]
