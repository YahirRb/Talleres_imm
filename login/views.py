from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from empleado.models import Empleado
from django.contrib.auth.models import User

# Iniciar sesion 
class log_in(APIView):
    def post(self, request):
        # Obtener los datos de usuario y contraseña desde la solicitud POST
        correo = request.data.get('correo')
        password = request.data.get('password')
        # Autentica al usuario con las credenciales proporcionadas
        user = authenticate(request, username=correo, password=password)
        print(user)
        try:
            if user is None:
                #Realiza una consulta y obtiene los datos
                consulta_user = User.objects.get(email=correo)
                #Con los datos obtenidos se usa el username para iniciar sesion
                user=authenticate(request, username=consulta_user.username, password=password)
                login(request, user)  
                return Response("Login correct",status=status.HTTP_200_OK)   
            elif user is not None:
                # Si la autenticación es exitosa iniciar sesión
                login(request, user)
            
                # Devuelve el estado de código 200_0K indicando que la operación se realizó con exito
                return Response("Login correct",status=status.HTTP_200_OK)
            
                
        except :
            # Si la autenticación falló devuelve el estado de código 401_UNAUTHORIZED 
            # indicando que el usuario no esta registrado
            return Response("Login incorrect",status=status.HTTP_401_UNAUTHORIZED)
        
        

# Cerrar sesion
class log_out(APIView):
    
    def get(self,request):
        try:
            # Cierra la sesion del usuario
            logout(request)
            # Devuelve el estado de código 200_0K indicando que la operación se realizó con exito
            return Response(status=status.HTTP_200_OK)
        except:
            # Si el cierre de sesión falló devuelve el estado de código 401_UNAUTHORIZED 
            # indicando que el usuario no esta registrado
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        '''
        {
"correo":"juan.perez@example.com",
"password":"123456789"
}
'''