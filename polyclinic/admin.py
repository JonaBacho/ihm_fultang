from django.contrib import admin
from .models import Department, Patient, Consultation, MedicalFolder, MedicalFolderPage, Room, PatientAccess, Parameters, ConsultationType, Bill

# Register your models here.
admin.site.register(Department)
admin.site.register(Patient)
admin.site.register(Consultation)
admin.site.register(MedicalFolder)
admin.site.register(MedicalFolderPage)
admin.site.register(Room)
admin.site.register(PatientAccess)
admin.site.register(Parameters)
admin.site.register(ConsultationType)
#admin.site.register(Medicament)
admin.site.register(Bill)

