from rest_framework import serializers
from polyclinic.models import ExamRequest

class ExamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamRequest
        fields = '__all__'