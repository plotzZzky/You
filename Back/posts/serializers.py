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
            return request.user.id == obj.id

        return False


class FullPostSerializer(ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    comments = SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self, obj):
        amount = obj.comments.all()
        return len(amount)

