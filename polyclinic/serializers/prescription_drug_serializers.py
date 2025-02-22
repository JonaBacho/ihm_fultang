from rest_framework import serializers
from polyclinic.models import PrescriptionDrug
from polyclinic.serializers.medicament_serializers import MedicamentSerializer


class PrescriptionDrugSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerializer(read_only=True)
    class Meta:
        model = PrescriptionDrug
        fields = '__all__'


class PrescriptionDrugCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionDrug
        exclude = ['id', 'prescription']