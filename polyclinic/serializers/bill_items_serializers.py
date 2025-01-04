from rest_framework import serializers
from polyclinic.models import BillItem

class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = '__all__'