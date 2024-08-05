from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User

from comments.serializer import CommentSerializer
from users.serializer import UserSerializer
from users.models import Profile
from .models import Post


# Serializer of Followees
class ImageProfileSerializer(ModelSerializer):
    """ Serializa a imgem de perfil dos usuarios seguidos """
    class Meta:
        model = Profile
        fields = ['image']


class FolloweeSerializer(ModelSerializer):
    """ serializa o perfil dos usuario seguido """
    profile = ImageProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'profile']


# Serializer do usuario
class ProfileSerializer(ModelSerializer):
    follows = FolloweeSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['image', 'desc', 'follows']


class UserProfileSerializer(ModelSerializer):
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


class ModalSerializer(ModelSerializer):
    user = UserSerializer()
    comments = CommentSerializer(many=True)
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
