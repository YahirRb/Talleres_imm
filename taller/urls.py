from django.urls import  path
from .views import RegistroTaller,EliminaTaller,ConsultaTaller,Talleres,EditaTaller,TallerConcluido

urlpatterns = [
    path('taller/registro', RegistroTaller.as_view(),name ='registro_taller'),
    path('taller/eliminar', EliminaTaller.as_view(),name ='eliminar_taller'),
    path('taller/consultar', ConsultaTaller.as_view(),name ='consultar_taller'),
    path('taller/vigente', Talleres.as_view(),name ='consultar_taller'),
    path('taller/editar', EditaTaller.as_view(),name ='editar_taller'),
    path('taller/concluido', TallerConcluido.as_view(),name ='taller_concluido'),
]
