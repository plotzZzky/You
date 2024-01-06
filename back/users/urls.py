from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('profile/', views.receive_user_profile),
    path('update/', views.update_user),
    path('recovery/', views.recovery_password),
    path('question/', views.receive_your_question),
    path('validate/', views.validate_token),
]
