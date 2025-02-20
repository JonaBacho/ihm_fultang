# Generated by Django 4.2 on 2025-02-20 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0011_alter_examrequest_examname'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='facilities',
            field=models.CharField(choices=[('Television', 'Television'), ('Air Conditioning', 'Air Conditioning'), ('Private bathroom', 'Private bathroom'), ('Mini fridge', 'Mini fridge')], default='Private Bathroom', max_length=255),
        ),
        migrations.AddField(
            model_name='room',
            name='type',
            field=models.CharField(choices=[('Simple', 'Simple'), ('Emergency', 'Emergency'), ('Staff', 'Staff')], default='Simple', max_length=255),
        ),
        migrations.AlterField(
            model_name='bill',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='consultation',
            name='consultationDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='examrequest',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='examrequest',
            name='examStatus',
            field=models.CharField(default='Invalid', max_length=20),
        ),
        migrations.AlterField(
            model_name='examresult',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='hospitalisation',
            name='atDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='hospitalisation',
            name='removeAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='medicalfolder',
            name='createDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='medicalfolderpage',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='addAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='patientaccess',
            name='givenAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='addDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='beds',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
