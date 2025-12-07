from rest_framework.serializers import ModelSerializer, SerializerMethodField
from accounts.models import CustomUser
from .models import Post


class SimplePostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class UserProfileSerializer(ModelSerializer):
    me = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'me', 'picture']

    def get_me(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_if_my_profile(request, obj)
        return False


class FullPostSerializer(ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

def check_if_my_profile(request, user):
    return request.user.id == user.id
