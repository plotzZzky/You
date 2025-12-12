from rest_framework.serializers import ModelSerializer, SerializerMethodField
from accounts.serializer import SimpleUserSerializer
from .models import Post


class SimplePostSerializer(ModelSerializer):
    """ Serializer para os cards dos posts """
    class Meta:
        model = Post
        fields = '__all__'


class FullPostSerializer(ModelSerializer):
    """ Serializer para o view post modal """
    user = SimpleUserSerializer()
    comments = SerializerMethodField()
    likes = SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    @staticmethod
    def get_comments(obj):
        amount = obj.comments.all()
        return len(amount)

    @staticmethod
    def get_likes(obj):
        amount = obj.likes.all()
        return len(amount)

