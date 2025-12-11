from rest_framework.serializers import ModelSerializer, SerializerMethodField
from accounts.serializer import PublicUserSerializer
from .models import Post


class SimplePostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class FullPostSerializer(ModelSerializer):
    user = PublicUserSerializer()
    comments = SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    @staticmethod
    def get_comments(obj):
        amount = obj.comments.all()
        return len(amount)

