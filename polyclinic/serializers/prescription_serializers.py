from rest_framework import serializers
from polyclinic.models import Prescription
from polyclinic.serializers.prescription_drug_serializers import PrescriptionDrugSerializer, PrescriptionDrugCreateSerializer


class PrescriptionSerializer(serializers.ModelSerializer):
    prescription_drug = PrescriptionDrugSerializer(many=True, read_only=True)
    class Meta:
        model = Prescription
        fields = '__all__'


class PrescriptionCreateSerializer(serializers.ModelSerializer):
    prescription = PrescriptionDrugCreateSerializer(many=True)

    class Meta:
        model = Prescription
        exclude = ['id', 'addDate']