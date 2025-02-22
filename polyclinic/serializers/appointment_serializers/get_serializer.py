from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from polyclinic.models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = '__all__'
