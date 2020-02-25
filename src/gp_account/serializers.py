from rest_framework import serializers
from . import models
from django.contrib.auth.models import User


class GetFullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','is_superuser','first_name', 'last_name')

class UserSerializerWithToken(serializers.ModelSerializer):    
    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()    

    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER        

        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)        
        return token    
    
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name')

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.Profile
        fields = ('__all__')

class TherapyRequestSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.TherapyRequest
        fields = ('__all__')

class TherapyOfferSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.TherapyOffer
        fields = ('__all__')

class TherapySearcherSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.TherapySearcher
        fields = ('__all__')

class TherapistSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.Therapist
        fields = ('__all__')

