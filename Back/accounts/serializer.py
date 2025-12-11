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


class UpdateUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class PublicUserSerializer(ModelSerializer):
    followers = SerializerMethodField()
    followed = SerializerMethodField()
    me = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'picture', 'me', 'followers', 'followed', 'question']

    def get_followers(self, obj):
        # print(self.context.get('request').user)
        followers = obj.followers.filter(followers=obj)

        return PublicUserSerializer(followers, many=True).data

    def get_followed(self, obj):
        me = self.context.get('request').user
        return True if obj in me.followers.all() else False

    def get_me(self, obj):
        user = self.context.get('request').user
        return True if obj.id == user.id else False
