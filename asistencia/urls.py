from django.urls import  path
from .views import TomaAsistencia,ListaAsistencia

urlpatterns = [
    path('asistencia', TomaAsistencia.as_view(),name ='Asistencia'),
    path('lista', ListaAsistencia.as_view(), name="Lista"),
]