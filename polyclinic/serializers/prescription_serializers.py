from rest_framework import serializers
from polyclinic.models import Prescription, PrescriptionDrug
from polyclinic.serializers.prescription_drug_serializers import PrescriptionDrugSerializer, PrescriptionDrugCreateSerializer
from rest_framework.exceptions import ValidationError

class PrescriptionSerializer(serializers.ModelSerializer):
    prescription_drug = PrescriptionDrugSerializer(many=True, read_only=True)
    class Meta:
        model = Prescription
        fields = '__all__'


class PrescriptionCreateSerializer(serializers.ModelSerializer):
    prescription_drugs = PrescriptionDrugCreateSerializer(many=True, required=True)

    class Meta:
        model = Prescription
        exclude = ['id', 'addDate']

    def create(self, validated_data):
        if 'idConsultation' not in validated_data:
            raise ValidationError({"details": "la consultation est requise"})

        prescription_drugs = validated_data['prescription_drugs']
        prescription = Prescription.objects.create(
            note=validated_data.pop('note', None),
            idPatient=validated_data['idPatient'],
            idConsultation=validated_data['idConsultation'],
            idMedicalStaff=validated_data['idMedicalStaff']
        )
        for item in prescription_drugs:
            PrescriptionDrug.objects.create(prescription=prescription, **item)
