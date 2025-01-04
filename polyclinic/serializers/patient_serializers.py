from rest_framework import serializers
from polyclinic.models import Patient, MedicalFolder

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class PatientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ['condition', 'service', 'idMedicalFolder']

    def create(self, validated_data):
        cni_number = validated_data.pop('cniNumber', None)
        gender = validated_data.pop('gender', None)

        # on sauvegarde d'abord le dossier medical
        medical_folder = MedicalFolder(folderCode=gender + cni_number, isClosed=False)
        medical_folder.save()

        patient = Patient.objects.create(
            idMedicalFolder=medical_folder,
            cniNumber=cni_number,
            gender=gender,
            **validated_data
        )

        return patient