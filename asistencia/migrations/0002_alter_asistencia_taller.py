# Generated by Django 4.2.4 on 2023-12-22 01:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('taller', '0002_taller_esta_lleno'),
        ('asistencia', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asistencia',
            name='taller',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='taller.taller'),
        ),
    ]
