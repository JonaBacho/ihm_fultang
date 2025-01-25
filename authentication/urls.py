from django.urls import path
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]