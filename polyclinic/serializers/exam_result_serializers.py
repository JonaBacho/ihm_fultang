from rest_framework import serializers
from polyclinic.models import ExamResult

class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResult
        fields = '__all__'