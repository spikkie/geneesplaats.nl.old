from rest_framework import viewsets, permissions
from .models import Idea
from .serializers import IdeaSerializer
from . import serializers

class IsOwner(permissions.BasePermission):
    message = "Not an owner."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.owner

class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    #permission_classes = [IsOwner]
    permission_classes = [permissions.AllowAny]

