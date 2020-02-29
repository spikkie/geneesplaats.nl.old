from django.db import models
from django.conf import settings

class OwnedModel(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default='0')

    class Meta:
        abstract = True

class TherapyRequest(OwnedModel):
    request = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.request)

class TherapyOffer(OwnedModel):
    offer = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.offer)

class Profile(models.Model):
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return '%s' % (self.date_of_birth)

class TherapySearcher(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    request = models.ForeignKey(TherapyRequest, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return 'TherapySearcher {}'.format(self.user.username)

class Therapist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    offer = models.ForeignKey(TherapyOffer, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return 'TherapySearcher {}'.format(self.user.username)

