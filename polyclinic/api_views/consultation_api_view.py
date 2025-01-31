from rest_framework.viewsets import ModelViewSet

from authentication.user_helper import fultang_user
from polyclinic.models import Consultation, MedicalStaff, MedicalFolderPage, PatientAccess
from polyclinic.permissions.consultation_permissions import ConsultationPermissions
from polyclinic.serializers.consultation_serializers import ConsultationSerializer, ConsultationCreateSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.utils.timezone import now

from polyclinic.serializers.patient_access_serializers import PatientAccessSerializer

tags = ["consultation"]
auth_header_param = openapi.Parameter(
    name="Authorization",
    in_=openapi.IN_HEADER,
    description="Token JWT pour l'authentification (Bearer <token>)",
    type=openapi.TYPE_STRING,
    required=True
)

@method_decorator(
    name="list",
    decorator=swagger_auto_schema(
        operation_summary="Lister les objets",
        operation_description=(
            "Cette route retourne une liste paginée de tous les objets du modèle. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param,
        openapi.Parameter('doctor', openapi.IN_QUERY, description="ID du docteur", type=openapi.TYPE_INTEGER, required=False),],
        tags=tags
    )
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(
        operation_summary="Récupérer un objet",
        operation_description=(
            "Cette route retourne les détails d'un objet spécifique en fonction de son ID. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(
        operation_summary="Créer un nouvel objet",
        operation_description=(
            "Cette route permet de créer un nouvel objet. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(
        operation_summary="Mettre à jour un objet",
        operation_description=(
            "Cette route permet de mettre à jour complètement un objet existant en fonction de son ID. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
@method_decorator(
    name="partial_update",
    decorator=swagger_auto_schema(
        operation_summary="Mise à jour partielle d'un objet",
        operation_description=(
            "Cette route permet de mettre à jour partiellement un objet existant en fonction de son ID. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
@method_decorator(
    name="destroy",
    decorator=swagger_auto_schema(
        operation_summary="Supprimer un objet",
        operation_description=(
            "Cette route permet de supprimer un objet existant en fonction de son ID. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
class ConsultationViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, ConsultationPermissions]
    pagination_class = CustomPagination

    def get_queryset(self):
        try:
            queryset = Consultation.objects.all()
            if "doctor" in self.request.query_params:
                idDoctor = self.request.query_params["doctor"]
                doctor = MedicalStaff.objects.get(id=idDoctor)
                queryset = queryset.filter(idMedicalStaffGiver=doctor)
            return queryset
        except MedicalStaff.DoesNotExist:
            return Response({'details': "l'id du medecin passé ne correspond à aucun docteur existant"}, status.HTTP_404_NOT_FOUND)

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ConsultationCreateSerializer
        else:
            return ConsultationSerializer

    def perform_create(self, serializer):
        user, _ = fultang_user(self.request)
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        try:
            # avant de sauvegarder la consultation on met à jour la page en question en BD avec les notes
            medical_folder_page = MedicalFolderPage.objects.get(pk=serializer.validated_data['idMedicalFolderPage'])
            medical_folder_page.nurseNote = serializer.validated_data['consultationReason']
            medical_folder_page.save()
            # on donne les acces au medecin
            medical_staff = MedicalStaff.objects.get(id=serializer.validated_data['idMedicalStaffGiver'])
            patient_access = PatientAccess.objects.filter(idPatient=serializer.validated_data['idPatient'])
            patient_access = patient_access.filter(idMedicalStaff=medical_staff).first()
            if patient_access:
                patient_access.access = True
                patient_access.save()
                serializer = PatientAccessSerializer(patient_access)
            else:
                patient_access = PatientAccess.objects.create(idPatient=serializer.validated_data['idPatient'], idMedicalStaff=medical_staff,
                                                              access=True)
                serializer = PatientAccessSerializer(patient_access)
            serializer.save(idMedicalStaffSender=user)
        except Exception as e:
            return Response({'detail': str(e)}, status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        user, _ = fultang_user(self.request)
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save(idMedicalStaffSender=user)

    @swagger_auto_schema(
        operation_description="Permet de lister les consultations journalières d'un docteur/ ou les historiques des consultations",
        responses={
            200: openapi.Response(description=" Liste des consultations du docteur"),
            404: openapi.Response(description="Docteur inexistant existent"),
            400: openapi.Response(description="Bad request"),
        },
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="ID dU medical staff concerné",
                              type=openapi.TYPE_INTEGER, required=True),
            openapi.Parameter(
                'history',
                openapi.IN_QUERY,
                description="Si `true`, retourne juste les consultations du medicin qui ne sont plus à pending",
                type=openapi.TYPE_BOOLEAN,
                required=False
            ),
            auth_header_param
        ],
        tags=tags
    )
    @action(methods=["get"], detail=False, url_path='doctor/(?P<id>[^/.]+)', permission_classes=[ConsultationPermissions])
    def consultation_doctor(self, request, id):
        try:
            self.pagination_class = None
            medical_staff = MedicalStaff.objects.get(id=id)
            queryset = Consultation.objects.filter(idMedicalStaffGiver=medical_staff)
            history = self.request.query_params.get("history", "false")
            if history and history.lower() == "true":
                queryset = queryset.exclude(state="Pending")
                return Response(queryset, status.HTTP_200_OK)
            else:
                queryset = queryset.filter(consultationDate__date=now().date()).filter(state="Pending")
                return Response(queryset, status.HTTP_200_OK)
        except MedicalStaff.DoesNotExist:
            return Response("le docteur spécifé n'existe pas", status.HTTP_404_NOT_FOUND)



