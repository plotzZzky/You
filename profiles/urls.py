from django.urls import path

from . import views


urlpatterns = [
    # Profiles
    path('', views.show_your_profile, name='show_your_profile'),
    path('id=<int:user_id>/', views.show_user_profile, name='show_user_profile'),
    path('friends/id=<int:user_id>/', views.get_friends, name='get_yours_friends'),
    path('find/', views.find_peoples, name='find_friends'),
    path('follow=<int:user_id>', views.follow_manager, name='follow_manager'),
    # Timeline
    path('posts/user=<int:user_id>/', views.get_your_posts, name='get_your_posts'),
    path('images/user=<int:user_id>/', views.get_your_images, name='get_your_images'),
    # Thinking
    path('friends/thinking/', views.show_friends_thinking, name='show_friends_thinking'),
    path('all/thinking/', views.show_thinking, name='show_thinking'),
    # Images
    path('friends/images/', views.show_friends_images, name='show_friends_images'),
    path('all/images/', views.show_images, name='show_images'),
    # Posts
    path('post/add/', views.add_post, name='add_post'),
    path('modal/id=<int:post_id>/', views.get_modal, name='show_modal'),
    path('post/like=<int:post_id>/', views.like_manager, name='like_manager'),
    path('post/del=<int:post_id>/', views.delete_post, name='delete_post'),
    # Comments
    path('post/comment/add=<int:post_id>/', views.add_comment, name='add_comment'),
    path('post/comment/del=<int:comment_id>/', views.delete_comment, name='delete_comment'),

]