# Generated by Django 4.2 on 2025-02-02 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0003_alter_consultation_idmedicalstaffgiver_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='billitem',
            name='description',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='billitem',
            name='unityPrice',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='hospitalisation',
            name='paymentStatus',
            field=models.CharField(choices=[('Invalid', 'Invalid'), ('Valid', 'Valid')], default='Invalid', max_length=20),
        ),
        migrations.AlterField(
            model_name='billitem',
            name='designation',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='examrequest',
            name='patientStatus',
            field=models.CharField(choices=[('Invalid', 'Invalid'), ('Valid', 'Valid')], default='Invalid', max_length=20),
        ),
    ]
