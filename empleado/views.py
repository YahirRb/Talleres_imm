from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST,HTTP_201_CREATED
from .models import Empleado, EmpleadoSerializer
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class Registro(APIView):
    
    def post(self, request):
        # Obtén los datos de la solicitud (por ejemplo, datos JSON)
        datos = request.data

        # Deserializa los datos utilizando el serializador
        serializer = EmpleadoSerializer(data=datos)

        # Verifica si los datos son válidos
        if serializer.is_valid():
            # Guarda un nuevo registro de Empleado utilizando los datos deserializados
            empleado = serializer.save()

            # Crea un nuevo usuario en la tabla User
            user = User.objects.create_user(
                username=empleado.usuario,
                email=empleado.correo,
                password=datos.get('password')
            )
            
            # Devuelve una respuesta de éxito
            return Response({"mensaje": "Empleado creado con éxito"}, status=HTTP_201_CREATED)
        else:
            # Si los datos no son válidos, devuelve una respuesta de error
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        
@permission_classes([IsAuthenticated])
class Lista(APIView):
    def get(self,request):
        registros = Empleado.objects.all()
        
        resultados = EmpleadoSerializer(registros, many=True)
        print("Hola")

        return Response(resultados.data)

@permission_classes([IsAuthenticated])
class Consulta(APIView):
    def post(self, request):
        dato=request.data.get('dato')
        empleado=Empleado.objects.filter(Q(nombre__icontains=dato)|
                                         Q(apellidos__icontains=dato)|
                                         Q(telefono__icontains=dato)|
                                         Q(edad__icontains=dato)|
                                         Q(sexo__icontains=dato)|
                                         Q(correo__icontains=dato))
        datos_empleado=EmpleadoSerializer(empleado, many=True)
        
        return Response(datos_empleado.data)

@permission_classes([IsAuthenticated])  
class Estado(APIView):
    def post(self,request):
        empleado= request.data.get('id')
        nuevo_estado=request.data.get('dato')
        registro=Empleado.objects.get(id=empleado)
        user= User.objects.get(username=registro.correo)
        user.is_active=nuevo_estado
        user.save()
        return Response(status=HTTP_200_OK)
