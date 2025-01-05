from rest_framework import serializers
from polyclinic.models import Consultation
from polyclinic.serializers.medical_folder_page_serializers import MedicalFolderPageSerializer


class ConsultationSerializer(serializers.ModelSerializer):
    idMedicalFolderPage = MedicalFolderPageSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields = '__all__'

class ConsultationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        exclude = ['id', 'consultationPrice', 'idConsultationType', 'idMedicalStaffSender']