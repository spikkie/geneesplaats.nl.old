from rest_framework import serializers
from .models import userProfile
class userProfileSerializer(serializers.ModelSerializer):
    email=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=userProfile
        fields='__all__'
