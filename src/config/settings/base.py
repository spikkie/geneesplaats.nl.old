"""
Django settings for config project.
 
Generated by 'django-admin startproject' using Django 2.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

from environ import Env, Path
from google.oauth2 import service_account
from datetime import timedelta

ENV = Env()

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__) - 3


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = ENV.str("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = ENV.bool("DEBUG", default=False)

#ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1']
# 'DJANGO_ALLOWED_HOSTS' should be a single string of hosts with a space between each.
# For example: 'DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]'
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

ALLOWED_HOSTS = ['django','0.0.0.0', '127.0.0.1']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_registration',

     #https://pypi.org/project/django-cors-headers/
     'corsheaders',

    # third party
    'django_extensions',

    'rest_framework',
    'rest_framework.authtoken',
    'djoser',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    #My applications
	'accounts',
	'events',

        #todo merge code 
    #'gp_account',
    'debugcode',
    'idea',
]

#corsheaders.middleware.CorsMiddleware
#They correspond to a filter that’ll intercept all of our application’s requests and apply CORS logic to them.
#However, since we’re working full localhost, we’ll disable the CORS feature by adding the following to the same file:
#CORS_ORIGIN_WHITELIST = (
#    'http://localhost:3000',
#)
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        "DIRS": [BASE_DIR("templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": ENV.db(
        "DATABASE_URL",
        default=f"sqlite:////{BASE_DIR}/db.sqlite3",
    )
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static_cdn", "static_root" )

#STATICFILES_STORAGE = (
#    "django.contrib.staticfiles.storage.StaticFilesStorage"
#)

#Google Cloud Storage
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'geneesplaats-nl-static'
GS_PROJECT_ID = 'stoked-axle-267521'

#To allow django-admin.py collectstatic to automatically put your static files in your bucket set the following in your settings.py:
STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

#To use gcloud set:
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

#The OAuth 2 credentials to use for the connection. If unset, falls back to the default inferred from the environment (i.e. GOOGLE_APPLICATION_CREDENTIALS)
GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    os.path.join(BASE_DIR, "spikkie-service-account--stoked-axle-267521.iam.gserviceaccount.json")
)

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static_my_proj"),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "static_cdn", "media_root")

PROTECTED_ROOT = os.path.join(BASE_DIR, "static_cdn", "protected_media")

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
   'ACCESS_TOKEN_LIFETIME': timedelta(days=14),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
   'ROTATE_REFRESH_TOKENS': True,
#todo
#https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
#We rotate the Refresh tokens so that our users don’t have to log in again if
# they visit within 14 days, for ease of use. You can blacklist the tokens after
# rotating them, but we won’t cover it here. 

   'BLACKLIST_AFTER_ROTATION': False,
   'AUTH_HEADER_TYPES': ('JWT',),
}

LOGIN_URL = 'login'

# Authentication https://django-allauth.readthedocs.io/en/latest/installation.html
AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

SITE_ID = 2

DJOSER = {
    'LOGIN_FIELD' : 'email',

    "SEND_ACTIVATION_EMAIL": True,    
    "ACTIVATION_URL": "/auth/activation/{uid}/{token}",
    "SEND_CONFIRMATION_EMAIL": True,    
    "USER_CREATE_PASSWORD_RETYPE": True,    
    "SET_PASSWORD_RETYPE": True,    
    "PASSWORD_RESET_CONFIRM_RETYPE": True,    
    "SET_USERNAME_RETYPE": False,    
    "USERNAME_RESET_CONFIRM_RETYPE": False, 
    "PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND": False,    
    "USERNAME_RESET_SHOW_EMAIL_NOT_FOUND": False,    
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,    
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": False, 

    "EMAIL": {
            "activation": "djoser.email.ActivationEmail",
            "confirmation":
            "djoser.email.ConfirmationEmail",
            "password_reset":
            "djoser.email.PasswordResetEmail",
            "password_changed_confirmation":
            "djoser.email.PasswordChangedConfirmationEmail",
            "username_changed_confirmation":
            "djoser.email.UsernameChangedConfirmationEmail",
            "username_reset":
            "djoser.email.UsernameResetEmail",
    },

    "TOKEN_MODEL": None, 
    'SERIALIZERS': {
        'user_create': 'accounts.serializers.UserRegistrationSerializer',
        'current_user': 'accounts.serializers.UserSerializer',
    },
}

# https://django-registration.readthedocs.io/en/1.0/quickstart.html
ACCOUNT_ACTIVATION_DAYS = 7

#todo check why we need LOGIN_REDIRECT_URL
#LOGIN_REDIRECT_URL = '/'
# LOGIN_REDIRECT_URL = 'main:home'
# LOGOUT_REDIRECT_URL = 'main:home'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'spikkie@gmail.com'
EMAIL_HOST_PASSWORD = 'Bessabessabessa34!!'
EMAIL_PORT = 587

#todo  use os.environ.get
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
# EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASS')

#todo combine with gp_accounts
AUTH_USER_MODEL = 'accounts.CustomUser'
#https://django-allauth.readthedocs.io/en/latest/configuration.html
