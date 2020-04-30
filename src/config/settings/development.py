"""Development settings for Startup Organizer"""
from .base import *  # noqa: F403

DEBUG = ENV.bool("DEBUG", default=True)  # noqa: F405

TEMPLATES[0]["OPTIONS"].update(  # noqa: F405
    {
        "debug": ENV.bool(  # noqa: F405
            "TEMPLATE_DEBUG", default=True
        )
    }
)

CORS_ORIGIN_WHITELIST = (
              'http://react:3000',
              'http://react:3001',
              'http://react:3002',
              'http://react:3003',
              'http://react:3004',
              )


ALLOWED_HOSTS = ['django','0.0.0.0', '127.0.0.1', '172.18.0.3']

# https://github.com/evansd/whitenoise/issues/191
# Normally set to settings.DEBUG, but tests run with DEBUG=FALSE!
#WHITENOISE_AUTOREFRESH = True
#WHITENOISE_USE_FINDERS = True
