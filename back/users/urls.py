from django.urls import path

from . import views


urlpatterns = [
    path('login/', views.login),
    path('register/', views.register_user),
    path('profile/', views.get_profile),
    path('edit/', views.update_profile),
    path('del/', views.delete_user),
]
