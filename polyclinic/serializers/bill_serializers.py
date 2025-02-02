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
        try:
            patient = Patient.objects.get(pk=validated_data['patient'])
            amount = validated_data.pop('amount', None)
            bill = Bill.objects.create(
                billcode=patient.cniNumber + now.__str__(),
                operation=validated_data['operation'],
                medicalOperator=validated_data['medicalOperator'],
                patient=patient,
                amount=amount if amount else 0
            )
            total = 0
            for billItem in validated_data['billItems']:
                billItem['bill'] = bill.pk
                bill_service = BillService()
                bill_item = bill_service.create_bill_item(billItem)
                total += bill_item.total
            if amount != total:
                bill.amount = total
                bill.save()
        except Patient.DoesNotExist:
            raise serializers.ValidationError("patient does not exist")




