from rest_framework import serializers
from polyclinic.models import Exam

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'