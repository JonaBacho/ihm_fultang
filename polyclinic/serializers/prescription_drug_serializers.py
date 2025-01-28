from rest_framework import serializers
from polyclinic.models import PrescriptionDrug

class PrescriptionDrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionDrug
        fields = '__all__'


class PrescriptionDrugCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionDrug
        exclude = ['id']