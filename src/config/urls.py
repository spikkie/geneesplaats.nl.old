"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from .views import RootApiView
from rest_framework.schemas import get_schema_view

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token, ObtainJSONWebToken

#todo
#from gp_account.rest_framework_jwt_serializers import CustomJWTSerializer



root_api_url = [
    path("", RootApiView.as_view(), name="api-root")
]
api_urls = root_api_url

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "",
        TemplateView.as_view(template_name="root.html"),
        name="site_root",
    ),
    path("api/v1/", include(api_urls)),
    path("api/v1/schema", get_schema_view()),

    #djoser
    path("api/v1/auth/", include('djoser.urls')),
    # path("api/v1/auth/", include('djoser.urls.authtoken')),
    path("api/v1/auth/", include('djoser.urls.jwt')),

    # Available Endpoints
    # /users/
    # /users/me/
    # /users/confirm/
    # /users/resend_activation/
    # /users/set_password/
    # /users/reset_password/
    # /users/reset_password_confirm/
    # /users/set_username/
    # /users/reset_username/
    # /users/reset_username_confirm/
    #      Not used /token/login/ (Token Based Authentication)
    #      Not used /token/logout/ (Token Based Authentication)
    # /jwt/create/ (JSON Web Token Authentication)
    # /jwt/refresh/ (JSON Web Token Authentication)
    # /jwt/verify/ (JSON Web Token Authentication)

    #Supported authentication backends
    # JSON Web Token authentication from django-rest-framework-simplejwt


    #path to our account's app endpoints
    path("api/v1/accounts/",include("accounts.urls")),

    #django registration
    # path('api/v1/accounts/', include('django_registration.backends.activation.urls')),
    # django_registration_register is the account-registration view.
    # django_registration_complete is the post-registration success message.
    # django_registration_activate is the account-activation view.
    # django_registration_activation_complete is the post-activation success message.

    # path('accounts/', include('django.contrib.auth.urls')),

    path("api/v1/events/",include("events.urls")),

    #My Applications
    #gp_account
    #path("api/v1/gp_account/", include('gp_account.urls')),

    #debugcode
    path("api/v1/debugcode/", include('debugcode.urls')),
    #idea
    path("api/v1/idea/", include('idea.urls')),
]

