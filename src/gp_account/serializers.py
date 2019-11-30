from rest_framework import serializers
from . import models

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ('__all__')

class TherapyRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TherapyRequest
        fields = ('__all__')

class TherapyOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TherapyOffer
        fields = ('__all__')

class TherapySearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TherapySearcher
        fields = ('__all__')

class TherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Therapist
        fields = ('__all__')

