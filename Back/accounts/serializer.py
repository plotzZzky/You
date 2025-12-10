from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import CustomUser



class CreateUserSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'

    def update(self, instance, new_user_data):
        password = new_user_data.pop('password')
        pwd = new_user_data.pop('pwd')

        if password == pwd:
            instance.set_password(password)

        instance.save()

        return instance


class PublicUserSerializer(ModelSerializer):
    followers = SerializerMethodField()
    me = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'picture', 'me', 'followers']

    def get_followers(self, obj):
        user = self.context.get('request').user
        followers = obj.followers.filter(followers=user)

        return PublicUserSerializer(followers, many=True).data

    def get_me(self, obj):
        user = self.context.get('request').user
        return True if obj.id == user.id else False

