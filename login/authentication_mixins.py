from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
from empleado.models import Empleado

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username=request.data.get('username')
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user= Empleado.objects.get(nombre=username)
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
