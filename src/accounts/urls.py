from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views import UserProfileListCreateView, userProfileDetailView, ObtainTokenPairWithColorView

# router=DefaultRouter()

# router.register("all-profiles",UserProfileListCreateView)
# router.register("profile/<int:pk>",userProfileDetailView,basename='profile')

urlpatterns = [
    path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
    path("profile/<int:pk>",userProfileDetailView.as_view(),name="profile"),
    # path("",include(router.urls))

    path("jwt/create/", ObtainTokenPairWithColorView.as_view(), name="jwt-create"),
    path("jwt/refresh/", jwt_views.TokenRefreshView.as_view(), name="jwt-refresh"),
    path("jwt/verify/", jwt_views.TokenVerifyView.as_view(), name="jwt-verify"),
]

