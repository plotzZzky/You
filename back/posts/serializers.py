from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Post
from users.serializer import UserSerializer
from comments.serializer import CommentSerializer


def modal_serializer(item, request):
    user = request.user
    post_id = item.id
    text = item.text
    image = item.image
    date = item.date
    follow = True if item.user in user.profile.follows.all() else False
    user_id = item.user.id
    username = item.user.username
    pic = item.user.profile.image
    liked = True if user in item.likes.all() else False
    likes = len(item.likes.all())
    me = True if request.user == user else False

    user_dict = {"id": user_id, "username": username, "img": pic, "follow": follow, "me": me}

    comments = [{"id": x.id, "text": x.text, "username": x.user.username, "date": x.date,
                 'your': check_your(request, x.user)} for x in item.comments.all()]

    post = {"user": user_dict, 'id': post_id, "text": text, "image": image, "date": date, "liked": liked, "likes": likes,
            "comments": comments, 'your': check_your(request, item.user)}
    return post


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
