from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from .models import Asistencia,AsistenciaSerializer
from inscripcion.models import Inscripciones,InscripcionSerializer
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.db.models import Q

from rest_framework.decorators import  permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@permission_classes([IsAuthenticated])
class TomaAsistencia(APIView):
    def post(self, request):
        datos= request.data
        curp= datos.get('curp')
        idTaller= datos.get('taller')
        existe= Inscripciones.objects.filter(Q(taller__exact=idTaller)&Q(curp__exact=curp))
       
        serializer= AsistenciaSerializer(data=datos)
        
        if existe.exists():
            usuaria=Asistencia.objects.filter(Q(taller__exact=idTaller)&Q(curp__exact=curp))
            
            if usuaria.exists():    
                '''
                c=usuaria[0]
                if serializer.is_valid() :
                    serializer.save()
                
                    c.asistencia=True
                    c.save()
                    return Response("Asistencia tomada",status=HTTP_201_CREATED)
                else:
                    
                    
                   
                    ''' 
                
                return Response("Ya se tomó asistencia",status=HTTP_400_BAD_REQUEST)
            else:
                if serializer.is_valid() :
                    serializer.save()
                    return Response("Asistencia tomada",status=HTTP_201_CREATED)
                else:
                    print('nO')
            
            
              
        else: 
            return Response("No hay datos")
            
@permission_classes([IsAuthenticated])
class ListaAsistencia(APIView):
    def get(self,request):
        datos= Asistencia.objects.all()
        serializer = AsistenciaSerializer(datos, many=True)
        return Response(serializer.data)  

    