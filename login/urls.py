from django.urls import  path
from .views import log_in,log_out

urlpatterns = [
    path('api/login', log_in.as_view(),name ='login'),
    path('api/logout', log_out.as_view(),name ='logout'),
]