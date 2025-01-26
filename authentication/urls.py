from django.urls import path
from .views import CustomTokenObtainPairView, UserProfileView
from rest_framework_simplejwt import views as jwt_views
from .views import RegistrationView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserProfileView.as_view(), name='user_profile'),
    #path('register/', RegistrationView.as_view(), name='register'),
]