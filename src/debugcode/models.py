from django.db import models

# Create your models here.
class EchoMessage(models.Model):
    msg = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.msg)

