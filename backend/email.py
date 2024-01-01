from django.core.mail import send_mail, EmailMessage
from .settings import EMAIL_HOST_USER

def enviar_correo(destinatario, asunto, mensaje):
    remitente = EMAIL_HOST_USER  # Puedes establecer el remitente aquí o usar uno dinámico si lo necesitas
    send_mail(
        asunto,
        mensaje,
        remitente,
        [destinatario],
        fail_silently=False,
    )
