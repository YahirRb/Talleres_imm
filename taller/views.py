
from .models import TallerSerializer, Taller
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_201_CREATED
# Create your views here.

class RegistroTaller(APIView):
    def post(self,request):
        datos= request.data
        print(datos)
        serializer= TallerSerializer(data=datos)
        if serializer.is_valid():
            
            serializer.save()
            return Response(status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_404_NOT_FOUND)

class EliminaTaller(APIView):
    def post(self,request):
        id=request.data.get('clave')
        taller = Taller.objects.get(pk=id)
        if taller is None:
            return Response(status=HTTP_404_NOT_FOUND)
        else:
            taller.delete()
            return Response(status=HTTP_204_NO_CONTENT)

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

class Talleres(APIView):
    def get(self,request):
        datos= Taller.objects.all()
        serializer = TallerSerializer(datos, many=True)
        return Response(serializer.data)

class EditaTaller(APIView):
    def post(self,request):
        id = request.data.get('id')
        datos = request.data
        
        taller = Taller.objects.get(pk=id)  # Obtén la instancia existente del Taller
        print(taller)
        serializer = TallerSerializer(instance=taller, data=datos)
        
        if serializer.is_valid():
            print('Datos')
            serializer.save()  # Guarda los cambios en la instancia existente
            return Response('Taller editado exitosamente')
        else:
            return Response(serializer.errors, status=400) 
   