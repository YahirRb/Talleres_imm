from django.urls import  path
from .views import Registro,Lista,Consulta, Estado

urlpatterns = [
    path('empleado/registro', Registro.as_view(),name ='Registro'),
    path('empleado/lista', Lista.as_view(),name ='Lista'),
    path('empleado/consulta', Consulta.as_view(),name ='Consulta'),
    path('empleado/estado', Estado.as_view(),name ='Estado'),
]