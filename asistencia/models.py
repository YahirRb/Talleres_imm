from django.db import models
from taller.models import Taller
from inscripcion.models import Inscripciones
from rest_framework import serializers

# Create your models here.
#fecha, hora, idpersona, id taller
class Asistencia(models.Model):
    fecha=models.DateField()
    hora=models.TimeField()
    taller = models.ForeignKey(Taller, on_delete=models.DO_NOTHING,
                                
                                default=None)
    curp = models.CharField(max_length=18)

class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Asistencia
        fields='__all__'