from rest_framework import serializers
from polyclinic.models import BillItem


class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = '__all__'

class BillItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        exclude = ['id', 'bill']




