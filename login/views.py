from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from empleado.models import Empleado
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.sessions.models import Session
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken




# Iniciar sesion 



class log_in(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username=request.data.get('username')
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user= Empleado.objects.get(usuario=username)
            # Obtener el token de acceso del cuerpo de la respuesta
            token = response.data.get('access')
            # Decodificar el token para acceder a su payload
            decoded_token = AccessToken(token)
            # Agregar datos adicionales al payload
            decoded_token['nombre'] = user.nombre
            decoded_token['apellidos'] = user.apellidos
            decoded_token['correo'] = user.correo
            # Actualizar el token en la respuesta con los nuevos datos del payload
            response.data['access'] = str(decoded_token)
        return response
"""
class log_in(APIView):
    def post(self, request):
        # Obtener los datos de usuario y contraseña desde la solicitud POST
        correo = request.data.get('correo')
        password = request.data.get('password')
        # Autentica al usuario con las credenciales proporcionadas
        user = authenticate(request, username=correo, password=password)
        
        try:
            if user is None:
                
                #Realiza una consulta y obtiene los datos
                consulta_user = User.objects.get(email=correo)
                #Con los datos obtenidos se usa el username para iniciar sesion
                user=authenticate(request, username=consulta_user.username, password=password)
                login(request, user)
                
                token, created = Token.objects.get_or_create(user=user)
                print("########################")
                
                if created:
                    print("Se creo")
                    print(token.key)
                else:
                    print("No se creo")
                    token.delete()
                    token= Token.objects.create(user=user)
                    
                return Response(status=status.HTTP_200_OK)   
            elif user is not None:
                # Si la autenticación es exitosa iniciar sesión
                login(request, user)
                print(user)
                
                # Devuelve el estado de código 200_0K indicando que la operación se realizó con exito
                return Response("Login correct",status=status.HTTP_200_OK)
            
                
        except :
            # Si la autenticación falló devuelve el estado de código 401_UNAUTHORIZED 
            # indicando que el usuario no esta 
            
            return Response("Login incorrect",status=status.HTTP_401_UNAUTHORIZED)
"""     
        

# Cerrar sesion
#@permission_classes([IsAuthenticated])
class log_out(APIView):
    
    def get(self,request):
        try:
            #token_key=request.data.get('token')
            #token = Token.objects.get(key=token_key)
            #token.delete()
            #print(token)
            # Cierra la sesion del usuario
            logout(request)
            # Devuelve el estado de código 200_0K indicando que la operación se realizó con exito
            return Response(status=status.HTTP_200_OK)
        except:
            # Si el cierre de sesión falló devuelve el estado de código 401_UNAUTHORIZED 
            # indicando que el usuario no esta registrado
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class Resset_password(APIView):
    def post(self, request):
        pass