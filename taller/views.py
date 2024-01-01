
from .models import TallerSerializer, Taller
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_201_CREATED,HTTP_400_BAD_REQUEST
from django.db.models import Q
from datetime import datetime
import locale
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
# Create your views here.



@permission_classes([IsAuthenticated])
class RegistroTaller(APIView):
    def post(self,request):
        datos= request.data
        anio= datetime.now().year
        '''
        for taller_data in datos:
            
            serializer = TallerSerializer(data=taller_data)
            if serializer.is_valid():
                serializer.save()
            else:
                # Si algún taller no es válido, retorna una respuesta con los detalles del error
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        
        return Response("Talleres registrados correctamente", status=HTTP_201_CREATED)
        
        '''
        print(anio)
        fecha=[]
        

        for dia in datos.get('dias'):
            fecha_obj = datetime(anio, datos.get('mes'), dia).date()
            print(fecha_obj)
            fecha.append(fecha_obj.strftime("%Y-%m-%d"))
        print(fecha)
        datos['fecha']=f"{fecha}"
        serializer= TallerSerializer(data=datos)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])       
class EliminaTaller(APIView):
    def post(self,request):
        id=request.data.get('clave')
        taller = Taller.objects.get(pk=id)
        if taller is None:
            return Response(status=HTTP_404_NOT_FOUND)
        else:
            taller.delete()
            return Response(status=HTTP_204_NO_CONTENT)

@permission_classes([IsAuthenticated])
class ConsultaTaller(APIView):
    def post(self,request):
        id = request.data.get('id')
        datos_taller = Taller.objects.get(pk=id)
        print(datos_taller)
        if datos_taller is None:
            return Response(status=HTTP_404_NOT_FOUND)
            
        else:
            serializer = TallerSerializer(datos_taller)
            return Response(serializer.data)

@permission_classes([IsAuthenticated])
class Talleres(APIView):
    def get(self,request):
       
        datos= Taller.objects.all()
        talleres_vigentes=[]
        for taller in datos:
            if taller.vigente:
                talleres_vigentes.append(taller)
        serializer = TallerSerializer(talleres_vigentes, many=True)
        return Response(serializer.data)

@permission_classes([IsAuthenticated])
class EditaTaller(APIView):
    def post(self,request):
        id = request.data.get('id')
        datos = request.data
        
        taller = Taller.objects.get(pk=id)  # Obtén la instancia existente del Taller
        print(taller)
        serializer = TallerSerializer(instance=taller, data=datos)
        
        if serializer.is_valid():
            serializer.save()  # Guarda los cambios en la instancia existente
            return Response('Taller editado exitosamente')
        else:
            return Response(serializer.errors, status=400) 

#Considerar agregar el campo "Vigente=True"

@permission_classes([IsAuthenticated])
class TallerConcluido(APIView):
    def get(self,request):
        fecha_actual = datetime.now().date()
        
        talleres = Taller.objects.all()
        talleres_anteriores = []
            
        for taller in talleres:
            fechas_taller = taller.fecha.replace("[", "").replace("]", "").replace("'", "").split(", ")
            fechas_pasadas=True  # Suponiendo que 'fecha' es el campo donde se guarda la lista de fechas como cadena
            if taller.vigente:
                
                for fecha in fechas_taller:
                
                    fecha_taller = datetime.strptime(fecha, '%Y-%m-%d').date()
                    if fecha_taller >= fecha_actual : 
                        fechas_pasadas=False
                        break
                      # Si al menos una fecha del taller ha pasado, agregamos el taller y pasamos al siguiente taller
                if fechas_pasadas:
                    talleres_anteriores.append(taller)
                    taller.vigente=False
                    taller.save()
            else:
                 talleres_anteriores.append(taller)       
        serializer = TallerSerializer(talleres_anteriores, many=True)

        return Response(serializer.data)

