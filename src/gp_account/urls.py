from rest_framework import routers
from .api import ( 
    ProfileViewSet,
    TherapyRequestViewSet,
    TherapyOfferViewSet,
    TherapySearcherViewSet,
    TherapistViewSet,
)

router = routers.DefaultRouter()
router.register("profile", ProfileViewSet, base_name="api-profile")
router.register("therapyrequest", TherapyRequestViewSet, base_name="api-therapyrequest")
router.register("therapyoffer", TherapyOfferViewSet, base_name="api-therapyoffer")
router.register("therapysearcher", TherapySearcherViewSet, base_name="api-therapysearcher")
router.register("therapist", TherapistViewSet, base_name="api-therapist")

urlpatterns = router.urls
