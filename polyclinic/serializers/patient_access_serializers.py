from rest_framework import serializers
from polyclinic.models import PatientAccess

class PatientAcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccess
        fields = '__all__'