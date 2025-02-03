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
    amount = serializers.FloatField(required=False)

    class Meta:
        model = Bill
        exclude = ['billCode', 'date', 'isAccounted']

    def create(self, validated_data):
        if 'patient' in validated_data and validated_data['patient']:  # c'est la paiement de la facture d'un service pour un patient
            # amount = validated_data.pop('amount', None)
            patient = validated_data['patient']
            bill = Bill.objects.create(
                billCode=patient.cniNumber + now.__str__(),
                operation=validated_data['operation'],
                operator=validated_data['operator'],
                patient=patient,
            )
            if not validated_data['bill_items']:
                raise serializers.ValidationError({"detail": "Bill items required"})
            total = 0
            for item in validated_data['bill_items']:
                item['bill'] = bill.id
                bill_service = BillService()
                bill_item = bill_service.create_bill_item(item, False)
                total += bill_item.total
            bill.amount = total
            bill.save()
            return bill
        else:
            bill = Bill.objects.create(
                billCode=validated_data['operator'].cniNumber + now.__str__(),
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




