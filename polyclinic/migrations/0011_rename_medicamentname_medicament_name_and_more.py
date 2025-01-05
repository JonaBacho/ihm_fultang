# Generated by Django 4.2 on 2025-01-05 13:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0010_remove_consultation_consultationcost_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicament',
            old_name='medicamentName',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='medicament',
            name='medicamentCost',
        ),
        migrations.AddField(
            model_name='medicament',
            name='price',
            field=models.FloatField(default=5000),
        ),
        migrations.AddField(
            model_name='prescription',
            name='idMedicament',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicament'),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='expiryDate',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
