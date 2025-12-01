from rest_framework.serializers import ModelSerializer, CharField, SerializerMethodField

from .models import Comment


class CommentSerializer(ModelSerializer):
    username = CharField(source='user.username', read_only=True)
    your = SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'text', 'username', 'date', 'your']

    def get_your(self, obj):
        request = self.context.get('request')
        if request is not None:
            return check_your(request, obj.user)
        return False


def check_your(request, user):
    result = True if request.user == user else False
    return result
