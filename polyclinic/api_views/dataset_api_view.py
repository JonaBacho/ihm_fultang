# polyclinic/api_views/dataset_api_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from django.contrib.auth import get_user_model

from polyclinic.models import (
    Patient, Parameters, ConsultationType, Consultation, MedicalFolder,
    MedicalFolderPage, Exam, ExamRequest, ExamResult, PolyclinicProduct,
    Prescription, PrescriptionDrug
)
from polyclinic.permissions.dataset_permissions import IsDatasetAPIUser
from authentication.models import MedicalStaff
from polyclinic.serializers.dataset_serializers import (
    PatientDatasetSerializer, ParametersDatasetSerializer, ConsultationTypeDatasetSerializer,
    ConsultationDatasetSerializer, MedicalFolderDatasetSerializer, MedicalFolderPageDatasetSerializer,
    ExamDatasetSerializer, ExamRequestDatasetSerializer, ExamResultDatasetSerializer,
    PolyclinicProductDatasetSerializer, PrescriptionDatasetSerializer, PrescriptionDrugDatasetSerializer,
    MedicalStaffDatasetSerializer
)
from datetime import datetime, timedelta
import pytz

User = get_user_model()
class DatasetTokenAuthentication(TokenAuthentication):
    """
    Authentification basée sur un token unique pour le dataset.
    Ce token est passé dans l'en-tête Authorization comme "Token <token_value>".
    """
    keyword = 'Token' # S'attend à 'Token <your_unique_token>'

    def authenticate_credentials(self, key):
        # Ici, 'key' est la partie du token après 'Token '
        # Comparez-la avec votre token unique défini dans settings.
        expected_token = getattr(settings, 'DATASET_API_TOKEN', None)

        if not expected_token:
            raise NotImplementedError("DATASET_API_TOKEN n'est pas configuré dans settings.py")

        if key == expected_token:
            # Nous devons renvoyer un utilisateur qui sera considéré comme authentifié.
            # Créons un utilisateur "de service" s'il n'existe pas, ou utilisons-le.
            try:
                # Cherche un utilisateur spécifique pour le dataset.
                # Créez cet utilisateur via l'admin ou un management command.
                # Par exemple, un utilisateur avec le username 'dataset_user'
                user, created = User.objects.get_or_create(username='dataset_api_user', defaults={'is_active': False})
                if created:
                    print("Created a new dataset_api_user. Please ensure it has minimal permissions if needed.")
                return (user, None)  # Le second élément est le token, que nous n'utilisons pas ici
            except Exception as e:
                print(f"Error getting/creating dataset_api_user: {e}")
                raise AuthenticationFailed('Could not retrieve/create dataset API user.')

        raise AuthenticationFailed('Invalid token for dataset access.')


class DatasetExportAllView(APIView):
    authentication_classes = [DatasetTokenAuthentication]
    permission_classes = [IsDatasetAPIUser] # S'assure qu'un token valide est fourni

    def get(self, request, *args, **kwargs):
        data = {}

        # Récupérer toutes les instances de chaque modèle et les sérialiser
        data['patients'] = PatientDatasetSerializer(Patient.objects.all(), many=True).data
        data['medical_staff'] = MedicalStaffDatasetSerializer(MedicalStaff.objects.all(), many=True).data
        data['parameters'] = ParametersDatasetSerializer(Parameters.objects.all(), many=True).data
        data['consultation_types'] = ConsultationTypeDatasetSerializer(ConsultationType.objects.all(), many=True).data
        data['consultations'] = ConsultationDatasetSerializer(Consultation.objects.all(), many=True).data
        data['medical_folders'] = MedicalFolderDatasetSerializer(MedicalFolder.objects.all(), many=True).data
        data['medical_folder_pages'] = MedicalFolderPageDatasetSerializer(MedicalFolderPage.objects.all(), many=True).data
        data['exams'] = ExamDatasetSerializer(Exam.objects.all(), many=True).data
        data['exam_requests'] = ExamRequestDatasetSerializer(ExamRequest.objects.all(), many=True).data
        data['exam_results'] = ExamResultDatasetSerializer(ExamResult.objects.all(), many=True).data
        data['polyclinic_products'] = PolyclinicProductDatasetSerializer(PolyclinicProduct.objects.all(), many=True).data
        data['prescriptions'] = PrescriptionDatasetSerializer(Prescription.objects.all(), many=True).data
        data['prescription_drugs'] = PrescriptionDrugDatasetSerializer(PrescriptionDrug.objects.all(), many=True).data

        return Response(data, status=status.HTTP_200_OK)


class DatasetExportRecentView(APIView):
    authentication_classes = [DatasetTokenAuthentication]
    permission_classes = [IsDatasetAPIUser]

    def get(self, request, *args, **kwargs):
        # Récupérer le paramètre 'days' de l'URL, par défaut 7 jours
        days_str = request.query_params.get('days', '7')
        try:
            days = int(days_str)
            if days <= 0:
                return Response(
                    {"error": "Le paramètre 'days' doit être un entier positif."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response(
                {"error": "Le paramètre 'days' doit être un entier valide."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Calculer la date de début pour le filtrage
        # Assurez-vous d'utiliser un fuseau horaire si votre base de données en utilise un
        timezone = pytz.timezone(getattr(settings, 'TIME_ZONE', 'UTC'))
        start_date = datetime.now(timezone) - timedelta(days=days)

        data = {}

        # Filtrer chaque modèle par la date d'ajout/modification la plus pertinente
        data['patients'] = PatientDatasetSerializer(
            Patient.objects.filter(addDate__gte=start_date), many=True
        ).data
        # Pour MedicalStaff, il n'y a pas de champ addDate par défaut, on peut les inclure tous
        # ou ajouter un champ 'date_joined' ou 'last_modified' si c'est pertinent pour le dataset.
        # Pour cet exemple, on inclut tout le staff, car leur "addDate" n'est pas dans le modèle MedicalStaff.
        data['medical_staff'] = MedicalStaffDatasetSerializer(MedicalStaff.objects.all(), many=True).data

        data['parameters'] = ParametersDatasetSerializer(
            Parameters.objects.filter(addDate__gte=start_date), many=True
        ).data
        # ConsultationType n'a pas de date, inclure tous
        data['consultation_types'] = ConsultationTypeDatasetSerializer(ConsultationType.objects.all(), many=True).data

        data['consultations'] = ConsultationDatasetSerializer(
            Consultation.objects.filter(consultationDate__gte=start_date), many=True
        ).data
        data['medical_folders'] = MedicalFolderDatasetSerializer(
            MedicalFolder.objects.filter(lastModificationDate__gte=start_date), many=True
        ).data
        data['medical_folder_pages'] = MedicalFolderPageDatasetSerializer(
            MedicalFolderPage.objects.filter(addDate__gte=start_date), many=True
        ).data
        # Exam n'a pas de date, inclure tous
        data['exams'] = ExamDatasetSerializer(Exam.objects.all(), many=True).data

        data['exam_requests'] = ExamRequestDatasetSerializer(
            ExamRequest.objects.filter(addDate__gte=start_date), many=True
        ).data
        data['exam_results'] = ExamResultDatasetSerializer(
            ExamResult.objects.filter(addDate__gte=start_date), many=True
        ).data
        data['polyclinic_products'] = PolyclinicProductDatasetSerializer(
            PolyclinicProduct.objects.filter(updated_at__gte=start_date), many=True
        ).data
        data['prescriptions'] = PrescriptionDatasetSerializer(
            Prescription.objects.filter(addDate__gte=start_date), many=True
        ).data
        data['prescription_drugs'] = PrescriptionDrugDatasetSerializer(
            PrescriptionDrug.objects.filter(prescription__addDate__gte=start_date), many=True # Filtrer par la date de la prescription
        ).data

        return Response(data, status=status.HTTP_200_OK)