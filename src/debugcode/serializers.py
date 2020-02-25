from rest_framework import serializers
from .models import EchoMessage

class EchoMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EchoMessage 
        fields = ('__all__')

