from rest_framework.serializers import ModelSerializer, CharField, SerializerMethodField, ValidationError

from .models import Comment, Post


class PublicCommentSerializer(ModelSerializer):
    username = CharField(source='user.username', read_only=True)
    your = SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'text', 'username', 'date', 'your']

    def get_your(self, obj):
        request = self.context.get('request')

        if request is not None:
            return True if request.user == obj.user else False

        return False


class CreateCommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ['text', 'post']
