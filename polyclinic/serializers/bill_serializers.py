from django.utils.timezone import now
from rest_framework import serializers
from polyclinic.models import Bill, BillItem, Patient
from polyclinic.serializers.bill_items_serializers import BillItemCreateSerializer
from polyclinic.services.bill_service import BillService


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class BillCreateSerializer(serializers.ModelSerializer):
    bill_items = BillItemCreateSerializer(many=True, required=False)

    class Meta:
        model = Bill
        exclude = ['billCode', 'date', 'isAccounted']

    def create(self, validated_data):
        print("Validated Data:", validated_data)  # Debugging

        bill_data = {
            'operation': validated_data['operation'],
            'operator': validated_data['operator'],
        }
        if 'patient' in validated_data and validated_data['patient']:
            bill_data['patient'] = validated_data['patient']

        bill = Bill.objects.create(**bill_data)

        if not validated_data.get('bill_items'):
            raise serializers.ValidationError({"detail": "Bill items required"})

        total = 0
        for item in validated_data['bill_items']:
            item['bill'] = bill
            bill_service = BillService()
            bill_item = bill_service.create_bill_item(item, is_accounting=True)
            print("Bill Item Total:", bill_item.total)  # Debugging
            total += bill_item.total

        print("Calculated Total:", total)  # Debugging
        bill.amount = total
        bill.save()
        print("Final Bill Amount:", bill.amount)  # Debugging

        return bill