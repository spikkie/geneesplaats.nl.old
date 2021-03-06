"""Django Settings for Production instances of the site"""
from .base_test import *  # noqa: F401 F403

######################################################################
# PRODUCTION SETTINGS
######################################################################

#ALLOWED_HOSTS = ['.geneesplaats.nl']
ALLOWED_HOSTS = ['*']

ADMINS = MANAGERS = [
     ('Bas Spikmans', 'spikkie@gmail.com'),
]

#STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

#####################
# SECURITY SETTINGS #
#####################
#Todo
#CSRF_COOKIE_HTTPONLY = True
#CSRF_COOKIE_SECURE = True

#SECURE_BROWSER_XSS_FILTER = True
#SECURE_CONTENT_TYPE_NOSNIFF = True

#SECURE_SSL_REDIRECT = True
#SECURE_HSTS_SECONDS = 3600

#SECURE_SSL_REDIRECT = True
#CSRF_COOKIE_SECURE = True

#SECURE_HSTS_INCLUDE_SUBDOMAINS = True

#SESSION_COOKIE_DOMAIN = None  # not set on subdomains
#SESSION_COOKIE_HTTPONLY = True
#SESSION_COOKIE_NAME = "suorganizer_sessionid"
#SESSION_COOKIE_SECURE = True
#SESSION_EXPIRE_AT_BROWSER_CLOSE = True

#X_FRAME_OPTIONS = "DENY"



#todo
#see https://github.com/adamchainz/django-cors-headers#configuration
CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = (
        'http://react:3000',
)
