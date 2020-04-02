from rest_framework import serializers
from . import models
from django.contrib.auth.models import User


class IdeaSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = models.Idea
        fields = ('__all__')

