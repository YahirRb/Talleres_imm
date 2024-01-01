
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('login.urls')),
    path('', include('empleado.urls')),
    path('', include('taller.urls')),
    path('inscripcion/', include('inscripcion.urls')),
    path('asistencia/', include('asistencia.urls')),
    
]