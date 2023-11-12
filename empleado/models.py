from django.db import models
from rest_framework import serializers

# Create your models here.
class Empleado(models.Model):
     nombre=models.TextField()
     apellidos=models.TextField() 
     sexo=models.CharField(max_length=9)
     correo=models.TextField()
     es_activo= models.BooleanField(default=True),
     usuario=models.TextField()
     
class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'
