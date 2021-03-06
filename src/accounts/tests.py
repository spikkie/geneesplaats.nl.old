from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
#from django.contrib.auth.models import User
#from .models import userProfile
from django.test import TestCase
from django.contrib.auth import get_user_model
import json

# test the user registration endpoint
class RegistrationTestCase(APITestCase):
    def test_registration(self):
        # data={"email":"lynn@t.com", "password":"PASwwordLit", "re_password": "PASwwordLit"}
        data={"email":"lynn@t.com", "password":"PASwwordLit", "re_password":"PASwwordLit", "is_gk": True }
        response=self.client.post('/api/v1/auth/users/',data)
        print(response.data)
        print(response.status_code)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

#test case for the userprofile model
class userProfileTestCase(APITestCase):
    profile_list_url=reverse('all-profiles')
    def setUp(self):

        #define configuration
        # "SEND_ACTIVATION_EMAIL": True -> False
        # todo  
        # create a test to test SEND_ACTIVATION_EMAIL

        # create a new user making a post request to djoser endpoint
        print('userProfileTestCase setUp: create a new user making a post request to djoser endpoint')
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'mario@a.com','password':'i-keep-jumping',
            're_password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        print('userProfileTestCase setUp: obtain a json web token for the newly created user')
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'mario@a.com','password':'i-keep-jumping'})
        if response.status_code != 200:
            print('response not 200 : ' + str(response.status_code))
            return False
        print(response.data)
        print(response.status_code)
        self.token=response.data['access']
        self.api_authentication()
        
    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT '+self.token)

    # retrieve a list of all user profiles while the request user is authenticated
    def test_userprofile_list_authenticated(self):
        response=self.client.get(self.profile_list_url)
        print(response.data)
        print(response.status_code)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # retrieve a list of all user profiles while the request user is unauthenticated
    def test_userprofile_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response=self.client.get(self.profile_list_url)
        print(response.data)
        print(response.status_code)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    # check to retrieve the profile details of the authenticated user
    def test_userprofile_detail_retrieve(self):
        print('---- test_userprofile_detail_retrieve  response ----')
        i = 1
        response = ''
        while True:  
            response=self.client.get(reverse('profile',kwargs={'pk':i}))
            if response.status_code == 200:
                break
            else:
                print('response not 200')
            i = i + 1  
            if(i > 50):  
                break  
        print(response.data)
        print(response.status_code)
        self.assertEqual(response.status_code,status.HTTP_200_OK)


    # populate the user profile that was automatically created using the signals
    def test_userprofile_profile(self):
        print('---- test_userprofile_profile response ----')
        profile_data={'description':'I am a very famous game character','location':'nintendo world','is_creator':'true',}
        i = 1
        response = ''
        while True:  
            response=self.client.put(reverse('profile',kwargs={'pk':i}),data=profile_data)
            if response.status_code == 200:
                break
            #else:
                #print('response not 200')
                #print(response.data)
                #print(response.status_code)
            i = i + 1  
            if(i > 50):  
                break  
        print(response.data)
        print(response.status_code)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    
class restUserTestCase(APITestCase):
    profile_list_url=reverse('all-profiles')
    def test_gk(self):
        # create a new gk user making a post request to djoser endpoint
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'gk@a.com','password':'i-keep-jumping','re_password':'i-keep-jumping', 'is_gk': True})
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'gk@a.com','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.token=response.data['access']
        self.api_authentication()
        response=self.client.get('/api/v1/auth/users/me/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        print("7777777777777777777777777777777777777777777777777777777777 restUserTestCase response", response.data)
        self.assertEqual(response.data["is_gk"],True)
        self.assertEqual(response.data["is_tz"],False)


    def test_tz(self):
        # create a new tz user making a post request to djoser endpoint
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'tz@a.com','password':'i-keep-jumping','password':'i-keep-jumping','is_tz': True})
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'tz@a.com','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.token=response.data['access']
        self.api_authentication()
        response=self.client.get('/api/v1/auth/users/me/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["is_tz"],True)
        self.assertEqual(response.data["is_gk"],False)


    def test_gk_tz(self):
        # create a new gk and tz user making a post request to djoser endpoint
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'tz@a.com','password':'i-keep-jumping','is_tz': True, 'is_gk': True,})
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'tz@a.com','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.token=response.data['access']
        self.api_authentication()
        response=self.client.get('/api/v1/auth/users/me/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["is_tz"],True)
        self.assertEqual(response.data["is_gk"],True)

    def test_no_gk_tz(self):
        # create a new no gk and no tz user making a post request to djoser endpoint
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'nogktz@a.com','password':'i-keep-jumping'})
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'nogktz@a.com','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.token=response.data['access']
        self.api_authentication()
        response=self.client.get('/api/v1/auth/users/me/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["is_tz"],False)
        self.assertEqual(response.data["is_gk"],False)

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT '+self.token)


    def test_fav_color(self):
         #Test fav_color field
        self.user=self.client.post('/api/v1/auth/users/',data={'email':'tz@a.com','password':'i-keep-jumping', 're_password':'i-keep-jumping', 'fav_color': 'blue',})
        response=self.client.post('/api/v1/accounts/jwt/create/',data={'email':'tz@a.com','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.token=response.data['access']
        self.api_authentication()
        response=self.client.get('/api/v1/auth/users/me/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data["fav_color"],'blue')



class UsersManagersTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_gk)
        self.assertFalse(user.is_tz)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_gk_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='gk@user.com', password='foo', is_gk=True)
        self.assertTrue(user.is_gk)

    def test_create_tz_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='tz@user.com', password='foo', is_tz=True)
        self.assertTrue(user.is_tz)

    def test_create_gk_tz_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='gk_tz@user.com', password='foo', is_tz=True, is_gk=True)
        self.assertTrue(user.is_tz)
        self.assertTrue(user.is_gk)

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)




#activate user
# curl -X POST http://127.0.0.1:8001/api/v1/auth/users/activation/ --data 'uid=MTQ&token=5fr-601e3f721016227333f4'

