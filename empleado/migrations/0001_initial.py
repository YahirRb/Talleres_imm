# Generated by Django 4.2.4 on 2023-11-07 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.TextField()),
                ('apellidos', models.TextField()),
                ('telefono', models.TextField()),
                ('edad', models.IntegerField()),
                ('sexo', models.CharField(max_length=9)),
                ('correo', models.TextField()),
                ('es_activo', models.BooleanField(default=True)),
            ],
        ),
    ]