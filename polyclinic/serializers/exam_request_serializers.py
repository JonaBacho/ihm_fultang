from django.forms import ValidationError
from rest_framework import serializers
from polyclinic.models import ExamRequest
from polyclinic.serializers.exam_serializers import ExamCreateSerializer

class ExamRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamRequest
        exclude = ['id', 'addDate', 'examStatus']


class ExamRequestCreateManySerializer(serializers.Serializer):
    exams_list = ExamRequestCreateSerializer(many=True, required=True)

    def create(self, validated_data):
        exams_list = validated_data.pop('exams_list')

        exam_requests = []
        for exam_data in exams_list:
            exam_request = ExamRequest.objects.create(**exam_data)
            exam_requests.append(exam_request)
        return exam_requests

class ExamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamRequest
        fields = '__all__'