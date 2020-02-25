from django.urls import include, path
from rest_framework import routers
from .views import get_current_user, CreateUserView

from .api import ( 
    ProfileViewSet,
    TherapyRequestViewSet,
    TherapyOfferViewSet,
    TherapySearcherViewSet,
    TherapistViewSet,
)

router = routers.DefaultRouter()
router.register("profile", ProfileViewSet, basename="api-profile")
router.register("therapyrequest", TherapyRequestViewSet, basename="api-therapyrequest")
router.register("therapyoffer", TherapyOfferViewSet, basename="api-therapyoffer")
router.register("therapysearcher", TherapySearcherViewSet, basename="api-therapysearcher")
router.register("therapist", TherapistViewSet, basename="api-therapist")

urlpatterns = router.urls

urlpatterns += [
    path('current_user/', get_current_user),
    path('users/create', CreateUserView.as_view()),
]
