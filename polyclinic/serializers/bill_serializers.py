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
    bill_items = BillItemCreateSerializer(many=True)

    class Meta:
        model = Bill
        exclude = ['billCode', 'date', 'amount', 'isAccounted']

    def create(self, validated_data):
        try:
            patient = Patient.objects.get(pk=validated_data['patient'])
            bill = Bill.objects.create(
                billcode=patient.cniNumber + now.__str__(),
                operation=validated_data['operation'],
                medicalOperator=validated_data['medicalOperator'],
                patient=patient,
            )
            for billItem in validated_data['billItems']:
                billItem['bill'] = bill.pk
                bill_service = BillService()
                bill_service.create_bill_item(billItem)
        except Patient.DoesNotExist:
            raise serializers.ValidationError("patient does not exist")




