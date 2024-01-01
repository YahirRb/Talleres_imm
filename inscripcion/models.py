from django.db import models
from rest_framework import serializers
from taller.models import Taller

# Create your models here.
class Inscripciones(models.Model):
     curp = models.CharField(max_length=18)#agregar el metodo validator
     nombre=models.TextField()
     apellidos=models.TextField()
     telefono=models.TextField()
     edad=models.IntegerField()
     sexo=models.CharField(max_length=9)
     correo=models.TextField()
     taller = models.ForeignKey(Taller, on_delete=models.DO_NOTHING,
                                related_name='Inscripciones',
                                default=None,)
     fecha_registro= models.DateField(default='2024-01-10')
     
class InscripcionSerializer(serializers.ModelSerializer):
     class Meta:
          model = Inscripciones
          fields='__all__'
 
     
