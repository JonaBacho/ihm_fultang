# Generated by Django 4.2 on 2025-01-26 09:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountingStaff',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('role', models.CharField(choices=[('NoRole', 'NoRole'), ('Accountant', 'Accountant'), ('Auditor', 'Auditor'), ('FinanceManager', 'FinanceManager')], default='Accountant', max_length=20)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('authentication.user',),
        ),
        migrations.CreateModel(
            name='BudgetExercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField(default=django.utils.timezone.now)),
                ('end', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='ClassCompte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(default=0)),
                ('libelle', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='FinancialOperation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('classCompte', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.classcompte')),
            ],
        ),
        migrations.CreateModel(
            name='Facture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.FloatField(default=0)),
                ('type', models.CharField(max_length=255)),
                ('financialOperation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.financialoperation')),
            ],
        ),
        migrations.CreateModel(
            name='AccountState',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('soldeReel', models.FloatField(default=0)),
                ('soldePrevu', models.FloatField(default=0)),
                ('budgetExercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.budgetexercise')),
                ('classCompte', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.classcompte')),
            ],
        ),
    ]
