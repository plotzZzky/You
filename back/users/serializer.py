from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

from .models import Profile


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image', 'desc']


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']
