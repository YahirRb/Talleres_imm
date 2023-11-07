from django.urls import  path
from .views import Inscripcion,Lista,Consulta

urlpatterns = [
    path('inscripcion', Inscripcion.as_view(),name ='Inscripcion'),
    path('lista', Lista.as_view(),name ='Lista'),
    path('consulta', Consulta.as_view(),name ='Consulta'),
]