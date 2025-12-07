from rest_framework.serializers import ModelSerializer
from .models import Post


class FullPostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class SimplePostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

