# polyclinic/serializers/dataset_serializers.py
from rest_framework import serializers
from polyclinic.models import (
    Patient, Parameters, ConsultationType, Consultation, MedicalFolder,
    MedicalFolderPage, Exam, ExamRequest, ExamResult, PolyclinicProduct,
    Prescription, PrescriptionDrug
)
from authentication.models import MedicalStaff

# Sérialiseur pour le personnel médical (anonymisé)
class MedicalStaffDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalStaff
        fields = ('id', 'role', 'userType', 'accessLevel')

# Sérialiseur pour le patient (anonymisé)
class PatientDatasetSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(source='get_gender_display')
    condition = serializers.CharField(source='get_condition_display')
    service = serializers.CharField(source='get_service_display')

    class Meta:
        model = Patient
        fields = (
            'id', 'addDate', 'gender', 'birthDate', 'address',
            'condition', 'service', 'status'
        )
        read_only_fields = fields

# Sérialiseur pour les paramètres
class ParametersDatasetSerializer(serializers.ModelSerializer):
    idMedicalStaff = MedicalStaffDatasetSerializer(read_only=True)

    class Meta:
        model = Parameters
        fields = '__all__'
        depth = 1

# Sérialiseur pour les types de consultation
class ConsultationTypeDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationType
        fields = '__all__'

# Sérialiseur pour les consultations
class ConsultationDatasetSerializer(serializers.ModelSerializer):
    idMedicalFolderPage = serializers.PrimaryKeyRelatedField(read_only=True)
    idPatient = PatientDatasetSerializer(read_only=True)
    idMedicalStaffSender = MedicalStaffDatasetSerializer(read_only=True)
    idMedicalStaffGiver = MedicalStaffDatasetSerializer(read_only=True)
    idConsultationType = ConsultationTypeDatasetSerializer(read_only=True)
    paymentStatus = serializers.CharField(source='get_paymentStatus_display')
    state = serializers.CharField(source='get_state_display')
    statePatient = serializers.CharField(source='get_statePatient_display')

    class Meta:
        model = Consultation
        fields = (
            'id', 'consultationDate', 'consultationPrice', 'consultationReason',
            'consultationNotes', 'paymentStatus', 'state', 'statePatient',
            'idMedicalFolderPage', 'idPatient', 'idMedicalStaffSender',
            'idMedicalStaffGiver', 'idConsultationType'
        )

# Sérialiseur pour les dossiers médicaux
class MedicalFolderDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalFolder
        fields = ('id', 'createDate', 'lastModificationDate', 'isClosed')
        # folderCode pourrait être considéré comme sensible, donc exclu

# Sérialiseur pour les pages de dossier médical
class MedicalFolderPageDatasetSerializer(serializers.ModelSerializer):
    idMedicalStaff = MedicalStaffDatasetSerializer(read_only=True)

    class Meta:
        model = MedicalFolderPage
        fields = '__all__'
        depth = 1
        # Exclure potentiellement nurseNote, doctorNote, diagnostic si trop sensibles, ou les tronquer

# Sérialiseur pour les examens
class ExamDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

# Sérialiseur pour les requêtes d'examen
class ExamRequestDatasetSerializer(serializers.ModelSerializer):
    idExam = ExamDatasetSerializer(read_only=True)
    idConsultation = serializers.PrimaryKeyRelatedField(read_only=True) # ID de la consultation
    idPatient = PatientDatasetSerializer(read_only=True)
    idMedicalStaff = MedicalStaffDatasetSerializer(read_only=True)

    class Meta:
        model = ExamRequest
        fields = '__all__'

# Sérialiseur pour les résultats d'examen
class ExamResultDatasetSerializer(serializers.ModelSerializer):
    idExamRequest = serializers.PrimaryKeyRelatedField(read_only=True)
    idMedicalFolderPage = serializers.PrimaryKeyRelatedField(read_only=True)
    idPatient = PatientDatasetSerializer(read_only=True)
    idMedicalStaff = MedicalStaffDatasetSerializer(read_only=True)

    class Meta:
        model = ExamResult
        fields = ('id', 'addDate', 'notes', 'idExamRequest', 'idMedicalFolderPage', 'idPatient', 'idMedicalStaff')
        # examFile pourrait contenir des informations sensibles, donc exclu ou géré séparément

# Sérialiseur pour les produits de la polyclinique
class PolyclinicProductDatasetSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = PolyclinicProduct
        fields = '__all__'

# Sérialiseur pour les prescriptions
class PrescriptionDatasetSerializer(serializers.ModelSerializer):
    idPatient = PatientDatasetSerializer(read_only=True)
    idConsultation = serializers.PrimaryKeyRelatedField(read_only=True)
    idMedicalStaff = MedicalStaffDatasetSerializer(read_only=True)

    class Meta:
        model = Prescription
        fields = '__all__'

# Sérialiseur pour les médicaments de prescription
class PrescriptionDrugDatasetSerializer(serializers.ModelSerializer):
    medicament = PolyclinicProductDatasetSerializer(read_only=True)
    prescription = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PrescriptionDrug
        fields = '__all__'