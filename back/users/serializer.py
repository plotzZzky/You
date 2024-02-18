from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

from .models import Profile


def serialize_user(user):
    username = user.username
    email = user.email
    image = user.profile.image
    question = user.profile.question
    answer = user.profile.answer
    user_dict = {"username": username, "email": email, "image": image, "question": question, "answer": answer}
    return user_dict


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer

    class Meta:
        model = User
        fields = ['username', 'email']
