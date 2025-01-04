from rest_framework import serializers
from polyclinic.models import Parameters

class ParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameters
        fields = '__all__'

class ParametersCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameters
        exclude = ['id']