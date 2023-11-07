from django.shortcuts import render
from .models import Inscripciones, InscripcionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND
from django.db.models import Q
from taller.models import Taller

# Create your views here.
class Inscripcion(APIView):
    def post(self,request):
        datos=request.data
        serializer = InscripcionSerializer(data=datos)
        id_taller=datos.get('taller')
        #cupo_limite=Taller.objects.filter(id=serializer.id)
        if serializer.is_valid():
            cupo= Taller.objects.get(id=id_taller)
            if cupo.participantes >= cupo.cupo :
                print('lleno')
            else:
                serializer.save()
                cupo.participantes=cupo.participantes+1
                cupo.save()
            
                return Response(status=HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response({"errors": errors, "detail": "Datos de entrada no válidos"}, status=HTTP_400_BAD_REQUEST)
        

class Lista(APIView):
    def get(self, request):
        registros= Inscripciones.objects.all()
        consulta = Inscripciones.objects.select_related('taller').all()
        for inscripcion in consulta:
            print(f"Datos de Inscripción:")
            print(f"Nombre: {inscripcion.nombre}")
            print(f"Apellidos: {inscripcion.apellidos}")
            print(f"Correo: {inscripcion.correo}")

            print(f"Datos del Taller:")
            print(f"Nombre del Taller: {inscripcion.taller.nombre}")
            print(f"Mes del Taller: {inscripcion.taller.mes}")
            print(f"Instructor: {inscripcion.taller.instructor}")
            print()
        datos= InscripcionSerializer(registros, many=True)
        return Response(datos.data)

class Consulta(APIView):
    def post(self,request):
        consulta = request.data.get("dato")
        resultados = Inscripciones.objects.filter(Q(nombre__icontains=consulta)|
                                             Q(apellidos__icontains=consulta)|
                                             Q(telefono__icontains=consulta)|
                                             Q(edad__icontains=consulta)|
                                             Q(sexo__icontains=consulta)|
                                             Q(correo__icontains=consulta)|
                                             Q(curp__icontains=consulta))
        
        
        if len(resultados) != 0:
            datos = InscripcionSerializer(resultados, many=True)
            return Response(datos.data)
        else:
            return Response(status=HTTP_404_NOT_FOUND)
        