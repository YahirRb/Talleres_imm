from django.shortcuts import render
from .models import Inscripciones, InscripcionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND
from django.db.models import Q
from taller.models import Taller
from datetime import datetime
import qrcode
import os
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

def enviar_correo_con_adjunto(destinatario, asunto, cuerpo, archivo_adjunto):
    try:
        validate_email(destinatario)
    except ValidationError as e:
        print(f"El correo electrónico no es válido: {e}")
        return

    mensaje = EmailMessage(asunto, cuerpo, to=[destinatario])
    mensaje.attach_file(archivo_adjunto)

    try:
        mensaje.send()
        print("Correo enviado con éxito.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

def generar_codigo_qr(data, nombre_archivo):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    imagen_qr = qr.make_image(fill_color="black", back_color="white")
    imagen_qr.save(nombre_archivo)

 # Nombre del archivo de salida


# Create your views here.

class Inscripcion(APIView):
    def post(self,request):
        fecha_actual = datetime.now().date()
        datos=request.data
        datos['fecha_registro'] = fecha_actual
        serializer = InscripcionSerializer(data=datos)
        id_taller=datos.get('taller')
        curp= datos.get('curp')
        correo= datos.get('correo')
        
        fechas_pasadas=False
        cupo= Taller.objects.get(id=id_taller)
        
        usuaria_inscrita=Inscripciones.objects.filter(curp=curp)
        
        
        #cupo_limite=Taller.objects.filter(id=serializer.id)
        if serializer.is_valid():

            if cupo.participantes >= cupo.cupo :
                return Response('Cupo lleno',status=HTTP_404_NOT_FOUND)
            else:
                data={
                    'curp': curp,
                    'taller': id_taller
                }
                

                if usuaria_inscrita.exists() :
                    for usuaria in usuaria_inscrita:
                        print(usuaria.fecha_registro)
                        if id_taller != usuaria.taller.id:
                            fechas_taller = cupo.fecha.replace("[", "").replace("]", "").replace("'", "").split(", ")
                            for fecha in fechas_taller:
                                   
                                fecha_taller = datetime.strptime(fecha, '%Y-%m-%d').date()
                                if fecha_taller.month > usuaria.fecha_registro.month : 
                                    fechas_pasadas=True
                                    break
                            # Si al menos una fecha del taller ha pasado, agregamos el taller y pasamos al siguiente taller
                            if fechas_pasadas:
                                serializer.save()
                                cupo.participantes=cupo.participantes+1
                                cupo.save()
                                generar_codigo_qr(data, f'{curp}.png')

                                enviar_correo_con_adjunto('rodriguez111402@gmail.com',"Codigo Qr",
                                          "El siguiente codigo Qr sera util para la toma de asistencia para el taller",
                                          f"{curp}.png")
                                os.remove(f"{curp}.png")
                                return Response(status=HTTP_201_CREATED)
                            else:
                                return Response('si')
                            break
                        else:
                            return Response("Ya esta registrada",status=HTTP_404_NOT_FOUND)
                                
                            break
                        
                else:                
                    serializer.save()
                    cupo.participantes=cupo.participantes+1
                    cupo.save()
                    generar_codigo_qr(data, f'{curp}.png')

                    enviar_correo_con_adjunto('rodriguez111402@gmail.com',"Codigo Qr",
                                          "El siguiente codigo Qr sera util para la toma de asistencia para el taller",
                                          f"{curp}.png")
                    os.remove(f"{curp}.png")
            
                    return Response("Usuaria registrada",status=HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response({"errors": errors, "detail": "Datos de entrada no válidos"}, status=HTTP_400_BAD_REQUEST)
        
@permission_classes([IsAuthenticated])
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

@permission_classes([IsAuthenticated])
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
        