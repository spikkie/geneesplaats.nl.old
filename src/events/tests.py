#from django.urls import reverse
#from rest_framework.test import APITestCase
#from .models import Reviews,Event

from rest_framework import status
from accounts.tests import userProfileTestCase

class eventTestCase(userProfileTestCase):
    def setUp(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'prineOfPersia@a.com','password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        response=self.client.post('/api/v1/auth/jwt/create/',data={'email':'prineOfPersia@a.com','password':'i-keep-jumping'})
        print(response.data)
        self.token=response.data['access']
        self.api_authentication()
        
    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT '+self.token)


    def test_create_event(self):
        event_data={'name':'good life','description':'happy times','location':'kenya',}
        response=self.client.post('/api/v1/events/all-events/',data=event_data)
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
    
