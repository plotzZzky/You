from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User

from .models import Profile


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image', 'desc', 'question', 'answer']


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()
    me = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'me', 'profile']

    def get_me(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_if_my_profile(request, obj)
        return False


def check_if_my_profile(request, user):
    return request.user.id == user.id
