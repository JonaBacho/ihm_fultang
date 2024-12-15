from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Patient, PatientAccess, MedicalFolder
from polyclinic.permissions.patient_permissions import PatientPermission
from polyclinic.serializers import PatientSerializer, PatientCreateSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


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
        manual_parameters=[auth_header_param]
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
        manual_parameters=[auth_header_param]
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
        manual_parameters=[auth_header_param]
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
        manual_parameters=[auth_header_param]
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
        manual_parameters=[auth_header_param]
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
        manual_parameters=[auth_header_param]
    )
)
class PatientViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, PatientPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        if user.role=="Admin" or user.role=="Receptionist":
            return Patient.objects.all()

        return Patient.objects.filter(
            id__in=PatientAccess.objects.filter(
                idMedicalStaff=user,
                access=True
            ).values_list("idPatient", flat=True)
        )


    def get_serializer_class(self):
        if self.action == "create":
            return PatientCreateSerializer
        else:
            return PatientSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')

        gender = serializer.validated_data['gender']
        cni_number = serializer.validated_data['cniNumber']

        if gender is None or cni_number is None:
            return Response("gender ou cni_number absent", status=status.HTTP_400_BAD_REQUEST)

        # creation de dossier medical du patien
        mfolder = MedicalFolder(folderCode=gender + cni_number, isClosed=False)
        mfolder.save()
        serializer.validated_data['idMedicalFolder'] = mfolder.pk
        patient_serializer = PatientSerializer(data=serializer.validated_data)
        patient_serializer.is_valid(raise_exception=True)
        patient_serializer.save()
