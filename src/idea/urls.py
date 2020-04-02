from django.urls import include, path
from rest_framework import routers

from .api import ( 
    IdeaViewSet,
)

router = routers.DefaultRouter()
router.register("idea", IdeaViewSet, basename="api-idea")

urlpatterns = router.urls
urlpatterns += router.urls

