# Generated by Django 4.2.4 on 2023-11-12 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('empleado', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='empleado',
            old_name='telefono',
            new_name='usuario',
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='es_activo',
        ),
    ]
