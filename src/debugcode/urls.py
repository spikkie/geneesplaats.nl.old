from django.urls import path
from .views import EchoMessageView 
from .views import HelloView 

urlpatterns = [
    path('echo/', EchoMessageView.as_view()),
    path('hello/', HelloView.as_view(), name='hello'),
]


