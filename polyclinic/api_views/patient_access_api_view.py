from rest_framework.viewsets import ModelViewSet
from polyclinic.models import PatientAccess
from polyclinic.permissions.patient_access_permissions import PatientAccessPermission
from polyclinic.serializers.patient_access_serializers import PatientAcessSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.utils.timezone import now

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
class PatientAccessViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, PatientAccessPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = PatientAccess.objects.all()
        return queryset

    def get_serializer_class(self):
        return PatientAcessSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    @swagger_auto_schema(
        operation_description="Permet de retirer l'access d'un staff à un patient",
        responses={
            204: openapi.Response(description="Acess au patient mis retiré"),
            403: openapi.Response(description="Token invalide ou expiré"),
            404: openapi.Response(description="Access non existent"),
            400: openapi.Response(description="Bad request"),
        },
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_QUERY, description="ID de l'utilisateur", type=openapi.TYPE_INTEGER)
        ]
    )
    @action(methods=['get'], detail=False, url_path='remove-access')
    def remove_access(self, request, *args, **kwargs):
        access_id = request.GET.get('id')
        if not access_id:
            return Response({'details': "id de l'objet est requis"},
                            status=status.HTTP_400_BAD_REQUEST, content_type='application/json')
        p = PatientAccess.objects.get(id=access_id)
        if p:
            p.access = False
            p.lostAt = now()
            p.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'details': "id d'objet n'existe pas"}, status=status.HTTP_404_NOT_FOUND, content_type='application/json')