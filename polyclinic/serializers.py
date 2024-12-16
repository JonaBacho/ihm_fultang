from rest_framework import serializers
from polyclinic.models import MedicalStaff, Department, Patient, Appointment, Parameters, Consultation, \
    ConsultationType, MedicalFolder, MedicalFolderPage, Exam, ExamRequest, ExamResult, Medicament, Prescription, Room, \
    Bill, BillItem, Message, PatientAccess, Hospitalisation

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MedicalStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalStaff
        exclude = ['password']
        #fields = ['id', 'first_name', 'last_name']

    """
    def validate(self, attrs):
        if self.instance is None and 'id' in attrs:  # L'objet est en création
            raise serializers.ValidationError("L'ID ne peut pas être défini manuellement.")
        return attrs
    """

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class PatientAcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientAccess
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class PatientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ['condition', 'service', 'idMedicalFolder']

class AppointmentDetailSerializer(serializers.ModelSerializer):

    patient = PatientSerializer(read_only=True)
    medical_staff = MedicalStaffSerializer(read_only=True)

    class Meta:
        model = Appointment
        exclude = ['idPatient', 'idMedicalStaff']

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = '__all__'

class ParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameters
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class ConsultationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationType
        fields = '__all__'

class MedicalFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalFolder
        fields = '__all__'

class MedicalFolderPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalFolderPage
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class ExamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamRequest
        fields = '__all__'

class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResult
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class HospitalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitalisation
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


# personnalisation des serializers pour le login
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Ajoutez des informations supplémentaires sur l'utilisateur
        data['user'] = dict()
        #data['user']['id'] = self.user.id
        data['user']['username'] = self.user.username
        data['user']['email'] = self.user.email
        data['user']['role'] = self.user.role

        return data
