from django.urls import  path
from .views import log_in,log_out
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .authentication_mixins import CustomTokenObtainPairView
urlpatterns = [
    path('api/login', log_in.as_view(),name ='login'),
    path('api/logout', log_out.as_view(),name ='logout'),  
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]