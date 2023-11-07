from django.db import models
from rest_framework import serializers
# Create your models here.
class Taller(models.Model):
    nombre = models.TextField()
    mes = models.CharField(max_length=10)
    dias = models.TextField()
    cupo = models.IntegerField()
    instructor = models.TextField()
    participantes= models.IntegerField(default=0)
    
class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields ='__all__'