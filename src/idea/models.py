from django.db import models
from django.conf import settings


class IdeaOwnedModel(models.Model):
    idea_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default='0')

    class Meta:
        abstract = True
		
class Idea(IdeaOwnedModel):
    title = models.CharField(max_length=50)
    idea_text = models.TextField(blank=True, null=True)
    carouselImage = models.CharField(max_length=100, blank=True, null=True)
    detailKey = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
         return '{}'.format(self.title)
