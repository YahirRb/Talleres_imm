# Generated by Django 4.2.4 on 2023-12-25 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taller', '0002_taller_esta_lleno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taller',
            name='mes',
            field=models.IntegerField(),
        ),
    ]