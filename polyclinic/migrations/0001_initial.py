# Generated by Django 4.0.6 on 2023-01-13 12:08

from django.conf import settings
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalStaff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('role', models.CharField(choices=[('NoRole', 'NoRole'), ('Doctor', 'Doctor'), ('Patient', 'Patient'), ('Receptionist', 'Receptionist'), ('Admin', 'Admin'), ('Accountant', 'Accountant'), ('Nurse', 'Nurse'), ('Labtech', 'Labtech'), ('HRM', 'HRM'), ('Specialist', 'Specialist'), ('Ophtalmologist', 'Ophtalmologist'), ('Pharmacist', 'Pharmacist'), ('Dentist', 'Dentist'), ('Cashier', 'Cashier')], default='NoRole', max_length=20)),
                ('cniNumber', models.CharField(blank=True, default=' ', max_length=20)),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], default='Male', max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer', models.CharField(max_length=50)),
                ('tel', models.CharField(default='0', max_length=20)),
                ('date', models.DateTimeField(auto_now=True)),
                ('amount', models.FloatField(default=0.0)),
                ('totalItems', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ConsultationType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('reference', models.CharField(max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('examName', models.CharField(max_length=100)),
                ('examCost', models.FloatField()),
                ('examDescription', models.TextField(blank=True, max_length=23, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExamRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('examDetails', models.CharField(max_length=50, null=True)),
                ('examStatus', models.CharField(default='invalid', max_length=20)),
                ('patientStatus', models.CharField(default='invalid', max_length=20)),
                ('notes', models.TextField(blank=True, max_length=10000, null=True)),
                ('idExam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.exam')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalFolder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createTime', models.TimeField(auto_now=True)),
                ('createDate', models.DateField(auto_now=True)),
                ('lastModificationTime', models.TimeField(auto_now=True)),
                ('lastModificationDate', models.DateField(auto_now=True)),
                ('folderCode', models.CharField(max_length=300)),
                ('isClosed', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='MedicalFolderPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pageNumber', models.IntegerField()),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('remark', models.TextField(blank=True, max_length=10000, null=True)),
                ('idMedicalFolder', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolder')),
            ],
        ),
        migrations.CreateModel(
            name='Medicament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('quantity', models.IntegerField()),
                ('medicamentName', models.CharField(default='', max_length=50)),
                ('status', models.CharField(default='invalid', max_length=20)),
                ('medicamentCost', models.FloatField(default='0.0', max_length=20)),
                ('expiryDate', models.DateField()),
                ('description', models.TextField(default='important', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addDate', models.DateField(auto_now=True)),
                ('addTime', models.TimeField(auto_now=True)),
                ('cniNumber', models.CharField(blank=True, default=' ', max_length=20)),
                ('firstName', models.CharField(blank=True, max_length=50)),
                ('lastName', models.CharField(blank=True, default=' ', max_length=50)),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], default='Male', max_length=50)),
                ('phoneNumber', models.CharField(blank=True, default=' ', max_length=100)),
                ('birthDate', models.DateField(blank=True, default='0000-00-00', null=True)),
                ('address', models.CharField(blank=True, default=' ', max_length=25)),
                ('email', models.CharField(blank=True, default=' ', max_length=25)),
                ('condition', models.CharField(choices=[('NoCritical', 'NoCritical'), ('Critical', 'Critical')], default='NoCritical', max_length=50)),
                ('service', models.CharField(choices=[('Generalist', 'Generalist'), ('Specialist', 'Specialist'), ('All', 'All')], default='Generalist', max_length=50)),
                ('status', models.CharField(default='invalid', max_length=20)),
                ('idMedicalFolder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolder')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roomLabel', models.CharField(max_length=100)),
                ('beds', models.PositiveIntegerField(default=0)),
                ('busyBeds', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('dose', models.TextField()),
                ('idMedicalFolderPage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolderpage')),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idPatient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
            ],
        ),
        migrations.CreateModel(
            name='PatientAccess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('givenAt', models.DateTimeField(auto_now=True)),
                ('lostAt', models.DateTimeField(auto_now=True)),
                ('access', models.BooleanField(default=True)),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idPatient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Parameters',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(blank=True, null=True)),
                ('height', models.FloatField(blank=True, null=True)),
                ('temperature', models.FloatField(blank=True, null=True)),
                ('arterialPressure', models.FloatField(blank=True, null=True)),
                ('skinAppearance', models.CharField(blank=True, max_length=100, null=True)),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('idMedicalFolder', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='polyclinic.medicalfolder')),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addAt', models.DateTimeField(auto_now=True)),
                ('message', models.TextField()),
                ('reason', models.TextField()),
                ('messageType', models.CharField(choices=[('REPORT_PROBLEM', 'REPORT_PROBLEM'), ('HOSPITALISATION_REQUEST', 'HOSPITALISATION_REQUEST'), ('CONSULTATION_REQUEST', 'CONSULTATION_REQUEST'), ('ACCESS_REQUEST', 'ACCESS_REQUEST'), ('INFO', 'INFO')], default='INFO', max_length=30)),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='medicalfolder',
            name='idActualParam',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polyclinic.parameters'),
        ),
        migrations.CreateModel(
            name='Hospitalisation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('atDate', models.DateField(auto_now=True)),
                ('atTime', models.TimeField(auto_now=True)),
                ('bedLabel', models.CharField(max_length=100)),
                ('note', models.TextField()),
                ('isActive', models.BooleanField(default=True)),
                ('removeAt', models.DateTimeField(auto_now=True)),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idPatient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
                ('idRoom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.room')),
            ],
        ),
        migrations.CreateModel(
            name='ExamResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addTime', models.TimeField(auto_now=True)),
                ('addDate', models.DateField(auto_now=True)),
                ('notes', models.TextField(blank=True, max_length=10000, null=True)),
                ('idExamRequest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.examrequest')),
                ('idMedicalFolderPage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolderpage')),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idPatient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
            ],
        ),
        migrations.AddField(
            model_name='examrequest',
            name='idMedicalFolderPage',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolderpage'),
        ),
        migrations.AddField(
            model_name='examrequest',
            name='idMedicalStaff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='examrequest',
            name='idPatient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient'),
        ),
        migrations.CreateModel(
            name='Consultation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consultationDate', models.DateField(auto_now=True)),
                ('consultationTime', models.TimeField(auto_now=True)),
                ('consultationCost', models.FloatField(blank=True, null=True)),
                ('consultationReason', models.CharField(blank=True, max_length=100)),
                ('consultationNotes', models.TextField(blank=True, max_length=100000, null=True)),
                ('allergy', models.CharField(blank=True, max_length=1000, null=True)),
                ('previousHistory', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.CharField(default='invalid', max_length=20)),
                ('idConsultationType', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='polyclinic.consultationtype')),
                ('idMedicalFolderPage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicalfolderpage')),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idParameters', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.parameters')),
                ('idPatient', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
            ],
        ),
        migrations.CreateModel(
            name='BillItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('designation', models.CharField(max_length=50)),
                ('unitP', models.FloatField(default=0.0)),
                ('totalP', models.FloatField(default=0.0)),
                ('idBill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.bill')),
                ('idMedicament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.medicament')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('atDate', models.DateField()),
                ('reason', models.CharField(max_length=300)),
                ('requirements', models.CharField(max_length=500)),
                ('idMedicalStaff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('idPatient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polyclinic.patient')),
            ],
        ),
    ]
