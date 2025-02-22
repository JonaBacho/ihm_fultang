from rest_framework import serializers

from authentication.serializers.medical_staff_serializers import MedicalStaffSerializer
from polyclinic.models import ExamResult
from polyclinic.serializers.patient_serializers import PatientSerializer


class ExamResultSerializer(serializers.ModelSerializer):
    idPatient = PatientSerializer(read_only=True)
    idMedicalStaff = MedicalStaffSerializer(read_only=True)
    class Meta:
        model = ExamResult
        fields = '__all__'