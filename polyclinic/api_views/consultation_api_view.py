from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Consultation, MedicalStaff
from polyclinic.permissions.consultation_permissions import ConsultationPermissions
from polyclinic.serializers.consultation_serializers import ConsultationSerializer, ConsultationCreateSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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
        manual_parameters=[auth_header_param,
        openapi.Parameter('doctor', openapi.IN_QUERY, description="ID du docteur", type=openapi.TYPE_INTEGER, required=False),],
        tags=["Consultation"],
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
        tags=["Consultation"],
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
        tags=["Consultation"],
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
        tags=["Consultation"],
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
        tags=["Consultation"],
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
        tags=["Consultation"],
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
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save(idMedicalStaffSender=self.request.user)

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save(idMedicalStaffSender=self.request.user)