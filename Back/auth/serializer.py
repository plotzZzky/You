from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.hashers import make_password

from .models import CustomUser


class UserSerializer(ModelSerializer):
    username = CharField(min_length=4, max_length=10, required=True)
    question = CharField(min_length=4, max_length=48, required=True)
    answer = CharField(min_length=4, max_length=48, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'question']

    def create(self, user_form):
        password = user_form.pop('password')
        answer = user_form.pop('answer')

        hashed_answer = make_password(answer)
        user_form['answer'] = hashed_answer

        user = CustomUser.objects.create(**user_form)
        user.set_password(password)
        user.save()

        return user

    def update(self, instance, new_user_data):
        password = new_user_data.pop('password')
        pwd = new_user_data.pop('pwd')

        if password == pwd:
            instance.set_password(password)

        instance.save()

        return instance