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
            'id', 'billCode', 'date', 'amount', 'operation', 'isAccounted', 'operator', 'patient', 'bill_items'
        ]

    def get_bill_items(self, obj):
        # Récupérer tous les BillItems associés à ce Bill
        bill_items = BillItem.objects.filter(bill=obj)
        return BillItemSerializer(bill_items, many=True).data

class BillCreateSerializer(serializers.ModelSerializer):
    bill_items = BillItemCreateSerializer(many=True, required=False)

    class Meta:
        model = Bill
        exclude = ['billCode', 'date', 'isAccounted']

    def create(self, validated_data):

        bill_data = {
            'operation': validated_data['operation'],
            'operator': validated_data['operator'],
        }
        is_accounting = True
        if 'patient' in validated_data and validated_data['patient']:
            is_accounting = False
            bill_data['patient'] = validated_data['patient']

        bill = Bill.objects.create(**bill_data)

        if not validated_data.get('bill_items'):
            raise serializers.ValidationError({"detail": "Bill items required"})

        total = 0
        for item in validated_data['bill_items']:
            item['bill'] = bill
            bill_service = BillService()
            bill_item = bill_service.create_bill_item(item, is_accounting=is_accounting)
            total += bill_item.total

        bill.amount = total
        bill.save()
        print("Final Bill Amount:", bill.amount)

        return bill