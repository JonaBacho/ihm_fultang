from django.utils.timezone import now
from rest_framework import serializers

from accounting.serializers import FinancialOperationSerializer
from authentication.serializers.medical_staff_serializers import MedicalStaffSerializer
from polyclinic.models import Bill, BillItem, Patient
from polyclinic.serializers.bill_items_serializers import BillItemCreateSerializer, BillItemSerializer
from polyclinic.services.bill_service import BillService

class BillSerializer(serializers.ModelSerializer):
    operator = MedicalStaffSerializer(read_only=True)
    operation = FinancialOperationSerializer(read_only=True)
    bill_items = serializers.SerializerMethodField()

    class Meta:
        model = Bill
        fields = [
            'billCode', 'date', 'amount', 'operation', 'isAccounted', 'operator', 'patient', 'bill_items'
        ]

    def get_bill_items(self, obj):
        # Récupérer tous les BillItems associés à ce Bill
        bill_items = BillItem.objects.filter(bill=obj)
        return BillItemSerializer(bill_items, many=True).data

class BillCreateSerializer(serializers.ModelSerializer):
    bill_items = BillItemCreateSerializer(many=True, required=False)
    amount = serializers.FloatField(required=False)

    class Meta:
        model = Bill
        exclude = ['billCode', 'date', 'isAccounted']

    def create(self, validated_data):
        if 'patient' in validated_data and validated_data['patient']:  # c'est la paiement de la facture d'un service pour un patient
            # amount = validated_data.pop('amount', None)
            patient = validated_data['patient']
            bill = Bill.objects.create(
                operation=validated_data['operation'],
                operator=validated_data['operator'],
                patient=patient,
            )
            if not validated_data['bill_items']:
                raise serializers.ValidationError({"detail": "Bill items required"})
            total = 0
            for item in validated_data['bill_items']:
                item['bill'] = bill
                bill_service = BillService()
                bill_item = bill_service.create_bill_item(item, False)
                total += bill_item.total
            bill.amount = total
            bill.save()
            return bill
        else:
            bill = Bill.objects.create(
                operation=validated_data['operation'],
                operator=validated_data['operator'],
            )
            if not validated_data['bill_items']:
                raise serializers.ValidationError({"detail": "Bill items required"})
            total = 0
            for item in validated_data['bill_items']:
                item['bill'] = bill
                bill_service = BillService()
                bill_item = bill_service.create_bill_item(item, True)
                total += bill_item.total
            bill.amount = total
            bill.save()
            return bill




