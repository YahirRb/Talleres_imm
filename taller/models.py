from django.db import models
import json
from rest_framework import serializers
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from datetime import date

# Lista de fechas
def default_dates():
    return json.dumps([
        date(2024, 12, 12).isoformat(),
        date(2024, 12, 13).isoformat(),
        date(2024, 12, 14).isoformat()
    ])

class Taller(models.Model):
    nombre = models.TextField()
    mes = models.IntegerField()
    cupo = models.IntegerField()
    instructor = models.TextField()
    participantes= models.IntegerField(default=0)
    esta_lleno= models.BooleanField(default=False)
    fecha=models.TextField(default=default_dates)
    vigente=models.BooleanField(default=True)
    
class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields ='__all__'