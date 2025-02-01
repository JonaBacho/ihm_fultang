from rest_framework import serializers
from polyclinic.models import Consultation
from polyclinic.serializers.medical_folder_page_serializers import MedicalFolderPageSerializer
from authentication.serializers.medical_staff_serializers import MedicalStaffSerializer
from polyclinic.serializers.patient_serializers import PatientSerializer


class ConsultationSerializer(serializers.ModelSerializer):
    idMedicalFolderPage = MedicalFolderPageSerializer(read_only=True)
    idPatient = PatientSerializer(read_only=True)
    idMedicalStaffSender = MedicalStaffSerializer(read_only=True)
    idMedicalStaffGiver = MedicalStaffSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields = '__all__'

class ConsultationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        exclude = ['id', 'consultationPrice', 'idConsultationType', 'idMedicalStaffSender']