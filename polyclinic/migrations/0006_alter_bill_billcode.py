# Generated by Django 4.2 on 2025-02-03 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polyclinic', '0005_alter_billitem_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='billCode',
            field=models.CharField(editable=False, max_length=300, unique=True),
        ),
    ]
