from django.contrib import admin
from .models import MedicalStaff, Department, Patient, Consultation, MedicalFolder

# Register your models here.
admin.site.register(MedicalStaff)
admin.site.register(Department)
admin.site.register(Patient)
admin.site.register(Consultation)
admin.site.register(MedicalFolder)

