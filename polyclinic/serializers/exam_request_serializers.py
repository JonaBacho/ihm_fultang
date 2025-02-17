from django.forms import ValidationError
from rest_framework import serializers
from polyclinic.models import ExamRequest

class ExamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamRequest
        fields = '__all__'  


class ExamRequestCreateSerializer(serializers.Serializer):
    examsList = ExamRequestSerializer(many=True, required=True)

    idPatient = serializers.IntegerField(write_only=True)
    idConsultation = serializers.IntegerField(write_only=True)
    idMedicalStaff = serializers.IntegerField(write_only=True)
    patientStatus = serializers.CharField(write_only=True)

    def create(self, validated_data):
        exams_list = validated_data.pop('examsList')
        id_patient = validated_data.pop('idPatient')
        id_consultation = validated_data.pop('idConsultation')
        id_medical_staff = validated_data.pop('idMedicalStaff')
        patient_status = validated_data.pop('patientStatus')

        exam_requests = []
        for exam_data in exams_list:
            exam_request = ExamRequest.objects.create(
                exam_id=exam_data['idExam'],
                patient_id=id_patient,
                consultation_id=id_consultation,
                medical_staff_id=id_medical_staff,
                patient_status=patient_status
            )
            exam_requests.append(exam_request)

        return exam_requests