from rest_framework import serializers
from polyclinic.models import MedicalFolderPage
from polyclinic.serializers.parameters_serializers import ParametersSerializer, ParametersCreateSerializer


class MedicalFolderPageSerializer(serializers.ModelSerializer):
    parameters = ParametersSerializer(required=False, many=False)

    class Meta:
        model = MedicalFolderPage
        fields = '__all__'

class MedicalFolderPageCreateSerializer(serializers.ModelSerializer):
    parameters = ParametersCreateSerializer(required=False)

    class Meta:
        model = MedicalFolderPage
        exclude = ['id', 'pageNumber', 'idMedicalStaff']