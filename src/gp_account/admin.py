from django.contrib import admin
from .models import Profile,TherapyRequest,TherapyOffer,TherapySearcher,Therapist


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Profile._meta.get_fields()]

@admin.register(TherapyRequest)
class TherapyRequestAdmin(admin.ModelAdmin):
    pass
    #list_display = [field.name for field in TherapyRequest._meta.get_fields()]

@admin.register(TherapyOffer)
class TherapyOfferAdmin(admin.ModelAdmin):
    pass
    #list_display = [field.name for field in TherapyOffer._meta.get_fields()]

@admin.register(TherapySearcher)
class TherapySearcherAdmin(admin.ModelAdmin): #Therapie Zoekende
    list_display = [field.name for field in TherapySearcher._meta.get_fields()]

@admin.register(Therapist)
class TherapistAdmin(admin.ModelAdmin): #Geneeskundige
    list_display = [field.name for field in Therapist._meta.get_fields()]

