from rest_framework import serializers
from polyclinic.models import Appointment
from polyclinic.serializers.patient_serializers import PatientSerializer
from authentication.serializers.medical_staff_serializers import MedicalStaffSerializer

class AppointmentDetailSerializer(serializers.ModelSerializer):

    patient = PatientSerializer(read_only=True)
    medical_staff = MedicalStaffSerializer(read_only=True)

    class Meta:
        model = Appointment
        exclude = ['idPatient', 'idMedicalStaff']

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        exclude = ['id']