from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField
from django.contrib.auth.hashers import make_password
from .models import CustomUser


class UpdateUserSerializer(ModelSerializer):
    """ Usado para atualizar um perfil do usuário """
    username = CharField(max_length=150, required=False, allow_blank=True)
    password = CharField(write_only=True, required=False, allow_null=True)
    pwd = CharField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = '__all__'

    def update(self, instance, new_user_data):
        username = new_user_data.pop('username', None)
        password = new_user_data.pop('password', None)
        pwd = new_user_data.pop('pwd', None)
        desc = new_user_data.get('desc', None)
        question = new_user_data.get('question', None)
        answer = new_user_data.get('answer', None)

        if username:
            instance.username = username

        if desc:
            instance.desc = desc

        if question:
            instance.question = question

        if answer:
            instance.answer = make_password(answer)

        if password and password == pwd:
            instance.set_password(password)

        instance.save()

        return instance


class SimpleUserSerializer(ModelSerializer):
    """ Serializer simplificado para ser usado nos seguidores de um perfil """
    me = SerializerMethodField()
    followed = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'picture', 'me', 'followed']

    def get_me(self, obj):
        user = self.context.get('request').user
        return obj.id == user.id

    def get_followed(self, obj):
        me = self.context.get('request').user
        return obj in me.followers.all()


class UserProfileSerializer(SimpleUserSerializer):
    """ Serializer para o perfil de um usuário """

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'picture', 'me', 'followed', 'question']
