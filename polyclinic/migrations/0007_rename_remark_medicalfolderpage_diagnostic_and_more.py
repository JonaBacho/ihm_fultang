# Generated by Django 4.2 on 2025-01-04 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0006_rename_arterialpressure_parameters_bloodpressure_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicalfolderpage',
            old_name='remark',
            new_name='diagnostic',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='idMedicalFolder',
            new_name='idMedicnalFolder',
        ),
        migrations.AddField(
            model_name='medicalfolderpage',
            name='doctorNote',
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
        migrations.AddField(
            model_name='medicalfolderpage',
            name='nurseNote',
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
    ]
