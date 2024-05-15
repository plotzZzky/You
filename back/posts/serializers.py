from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Post
from users.serializer import UserSerializer
from comments.serializer import CommentSerializer


class ModalSerializer(ModelSerializer):
    user = UserSerializer()
    comments = CommentSerializer(many=True)
    your = SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_your(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_your(request, obj.user)
        return False


def check_your(request, user):
    result = True if request.user == user else False
    return result


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
