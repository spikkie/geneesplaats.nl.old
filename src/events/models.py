from django.db import models
from django.conf import settings


class Event(models.Model):
    name=models.CharField(max_length=250)
    organizer=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="organizer")
    description=models.TextField(blank=True,null=True)
    location=models.CharField(max_length=200)
    creation_date=models.DateTimeField(auto_now_add=True)
    day_of_event=models.DateTimeField(auto_now=True)
    attendees=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name="attendees",through='Attendees')

    def __str__(self):
        return self.name

class Reviews(models.Model):
    reviewer=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="reviews")
    review=models.TextField()
    event=models.ForeignKey(Event,on_delete=models.CASCADE,related_name="event") #change to reviews later
    class Meta:
        verbose_name_plural = "Reviews"
        

    def __str__(self):
        return self.reviewer.username +" : "+ self.event.name

class Attendees(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='user_many')
    event= models.ForeignKey(Event,on_delete=models.CASCADE,related_name='event_many')


    class Meta:
        verbose_name_plural = "Attendees"
    def __str__(self):
        return self.user.email + " - " + self.event.name
