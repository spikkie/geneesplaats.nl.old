from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import userProfile, CustomUser
from djoser.serializers import UserCreateSerializer, UserCreatePasswordRetypeSerializer 
from djoser.serializers import UserSerializer
from djoser.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


#Override Djoser Serializers

class MyUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User 
        read_only_fields = (settings.LOGIN_FIELD,)
        fields = tuple(User.REQUIRED_FIELDS) + (
            User._meta.pk.name,
            settings.LOGIN_FIELD,
            "is_gk",
            "is_tz",
            "fav_color",

       )


class MyUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User 
        fields = tuple(User.REQUIRED_FIELDS) + (    
            settings.LOGIN_FIELD,    
            User._meta.pk.name,    
            "password",    
            "is_gk",
            "is_tz",
            "fav_color",
        )    

class MyUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User 
        fields = tuple(User.REQUIRED_FIELDS) + (    
            settings.LOGIN_FIELD,    
            User._meta.pk.name,    
            "password",    
            "is_gk",
            "is_tz",
            "fav_color",
        )    


class userProfileSerializer(serializers.ModelSerializer):
    email=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=userProfile
        fields='__all__'

#The DRF Simple JWT package makes it very easy to develop custom claims so that we can send our user’s favorite color in each token by importing and subclassing with the original serializer.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['fav_color'] = user.fav_color
        return token
