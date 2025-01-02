from rest_framework import serializers
from polyclinic.models import MedicalStaff, Department, Patient, Appointment, Parameters, Consultation, \
    ConsultationType, MedicalFolder, MedicalFolderPage, Exam, ExamRequest, ExamResult, Medicament, Prescription, Room, \
    Bill, BillItem, Message, PatientAccess, Hospitalisation

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed


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

class MedicalStaffCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ne pas inclure le mot de passe dans la réponse

    class Meta:
        model = MedicalStaff
        exclude = ['id', 'is_superuser', 'groups', 'user_permissions', 'date_joined', 'last_login']

    def create(self, validated_data):
        # Extraire les champs nécessaires
        password = validated_data.pop('password', None)
        is_staff = validated_data.pop('is_staff',True)
        is_superuser = validated_data.pop('is_superuser', False)
        is_active = validated_data.pop('is_active', True)

        # Créer l'utilisateur avec le manager
        user = MedicalStaff.objects.create_user(
            password=password,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
            **validated_data
        )
        return user

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

        # Vérification de l'état de l'utilisateur
        if not self.user.is_active:
            raise AuthenticationFailed("Cet utilisateur est inactif. Veuillez contacter l'administrateur.")

        # Ajoutez des informations supplémentaires sur l'utilisateur
        data['user'] = dict()
        #data['user']['id'] = self.user.id
        data['user']['username'] = self.user.username
        data['user']['email'] = self.user.email
        data['user']['role'] = self.user.role

        return data
