from rest_framework.serializers import ModelSerializer

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

    class Meta:
        model = CustomUser
        fields = ['username', 'desc']

