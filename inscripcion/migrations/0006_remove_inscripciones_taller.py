# Generated by Django 4.2.4 on 2023-12-21 05:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inscripcion', '0005_remove_inscripciones_id_taller_inscripciones_taller'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inscripciones',
            name='taller',
        ),
    ]
