from django.db import models
from rest_framework import serializers

# Create your models here.
class Empleado(models.Model):
     nombre=models.TextField()
     apellidos=models.TextField() 
     correo=models.TextField()
     es_activo= models.BooleanField(default=True),
     usuario=models.TextField(primary_key=True, unique=True)
     #username
     
class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'
