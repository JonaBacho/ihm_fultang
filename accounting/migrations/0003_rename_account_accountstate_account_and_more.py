# Generated by Django 4.2 on 2025-01-26 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0002_rename_classcompte_account_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='accountstate',
            old_name='Account',
            new_name='account',
        ),
        migrations.RenameField(
            model_name='financialoperation',
            old_name='Account',
            new_name='account',
        ),
    ]
