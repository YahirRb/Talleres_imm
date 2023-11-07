from django.db import models
from rest_framework import serializers
from taller.models import Taller

# Create your models here.
class Inscripciones(models.Model):
     nombre=models.TextField()
     apellidos=models.TextField()
     curp=models.CharField(max_length=18, default="")
     telefono=models.TextField()
     edad=models.IntegerField()
     sexo=models.CharField(max_length=9)
     correo=models.TextField()
     taller = models.ForeignKey(Taller, on_delete=models.DO_NOTHING)
     
class InscripcionSerializer(serializers.ModelSerializer):
     class Meta:
          model = Inscripciones
          fields='__all__'
 
     
