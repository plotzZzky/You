from rest_framework.serializers import ModelSerializer, SerializerMethodField

from accounts.models import CustomUser
from accounts.serializer import CreateUserSerializer
from .models import Post


class UserProfileSerializer(ModelSerializer):
    me = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'me']

    def get_me(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_if_my_profile(request, obj)
        return False


class ModalSerializer(ModelSerializer):
    user = CreateUserSerializer()
    me = SerializerMethodField()
    following = SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_me(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_if_my_profile(request, obj.user)
        return False

    def get_following(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_if_following(request, obj.user)
        return False


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


def check_if_my_profile(request, user):
    return request.user.id == user.id


def check_if_following(request, user):
    follows = request.user.profile.follows
    if user in follows.all():
        return True
    else:
        return False
