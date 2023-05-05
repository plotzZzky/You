from django.urls import path

from . import views

urlpatterns = [
    # Posts
    path('', views.get_friends_posts, name="get_friends_posts"),
    path('all/', views.get_horizon_posts, name="get_horizon_posts"),
    path('your/', views.get_your_posts, name="get_your_posts"),
    path('info/id=<int:post_id>/', views.get_modal_info, name="get_modal_info"),
    path('add/', views.add_post, name='add_post'),
    path('del/id=<int:post_id>/', views.delete_post, name='delete_post'),
    # Comments
    path('comment/add/id=<int:post_id>/', views.add_comment, name='add_comment'),
    path('comment/del/id=<int:comment_id>/', views.delete_comment, name='delete_comment'),
    # Managers
    path('like/id=<int:post_id>/', views.like_manager, name='like_manager'),
    path('follow/id=<int:user_id>/', views.follow_manager, name='follow_manager'),
]