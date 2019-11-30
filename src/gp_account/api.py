from rest_framework import viewsets, permissions
from .models import Profile, TherapyRequest, TherapyOffer, TherapySearcher, Therapist
from .serializers import ProfileSerializer, TherapyRequestSerializer, TherapyOfferSerializer, TherapySearcherSerializer, TherapistSerializer
from . import serializers

class IsOwner(permissions.BasePermission):
    message = "Not an owner."

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwner]
    #permission_classes = [permissions.AllowAny]

class TherapyRequestViewSet(viewsets.ModelViewSet):
    queryset = TherapyRequest.objects.all()
    serializer_class = TherapyRequestSerializer
    permission_classes = [IsOwner]

class TherapyOfferViewSet(viewsets.ModelViewSet):
    queryset = TherapyOffer.objects.all()
    serializer_class = TherapyOfferSerializer
    permission_classes = [IsOwner]

class TherapySearcherViewSet(viewsets.ModelViewSet):
    queryset = TherapySearcher.objects.all()
    serializer_class = TherapySearcherSerializer
    permission_classes = [IsOwner]

class TherapistViewSet(viewsets.ModelViewSet):
    queryset = Therapist.objects.all()
    serializer_class = TherapistSerializer
    permission_classes = [IsOwner]

