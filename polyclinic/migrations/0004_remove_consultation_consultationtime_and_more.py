# Generated by Django 4.2 on 2024-12-29 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0003_medicalstaff_address_medicalstaff_birthdate_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='consultation',
            name='consultationTime',
        ),
        migrations.RemoveField(
            model_name='examrequest',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='examresult',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='hospitalisation',
            name='atTime',
        ),
        migrations.RemoveField(
            model_name='medicalfolder',
            name='createTime',
        ),
        migrations.RemoveField(
            model_name='medicalfolder',
            name='idActualParam',
        ),
        migrations.RemoveField(
            model_name='medicalfolder',
            name='lastModificationTime',
        ),
        migrations.RemoveField(
            model_name='medicalfolderpage',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='medicament',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='parameters',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='parameters',
            name='idMedicalFolder',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='addTime',
        ),
        migrations.RemoveField(
            model_name='prescription',
            name='addTime',
        ),
        migrations.AddField(
            model_name='parameters',
            name='idMedicalFolderPage',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='polyclinic.medicalfolderpage'),
        ),
        migrations.AddField(
            model_name='patient',
            name='idMedicalStaff',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='atDate',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='consultation',
            name='consultationDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='examrequest',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='examresult',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='hospitalisation',
            name='atDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='medicalfolder',
            name='createDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='medicalfolderpage',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='idMedicalFolder',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='polyclinic.medicalfolder'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='addDate',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
