from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_posts, name="get_posts"),
    path('info/', views.get_modal_info, name="get_modal_info"),
    path('add/', views.add_post, name='add_post'),
    path('del/', views.delete_post, name='delete_post'),
    path('like/', views.like_manager, name='like_manager'),
    path('follow/', views.follow_user, name='follow_manager'),
]
