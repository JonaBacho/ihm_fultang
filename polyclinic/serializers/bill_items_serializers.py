from rest_framework import serializers
from polyclinic.models import BillItem, Medicament, Consultation, Prescription, PrescriptionDrug, ExamRequest, Exam, \
    Hospitalisation, Room
from polyclinic.serializers.prescription_serializers import PrescriptionSerializer


class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = '__all__'

class BillItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        exclude = ['id', 'total', 'bill']




