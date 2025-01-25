from accounting.serializers import BudgetExerciseSerializer
from rest_framework.viewsets import ModelViewSet
from accounting.models import BudgetExercise
from polyclinic.models import ConsultationType
from polyclinic.permissions.consultation_type_permissions import ConsultationTypePermissions
from polyclinic.serializers.consultation_type_serializers import ConsultationTypeSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated


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
        operation_summary="Lister les exercices budgétaires",
        operation_description="Retourne une liste paginée des exercices budgétaires.",
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(
        operation_summary="Récupérer un exercice budgétaire",
        operation_description="Retourne les détails d'un exercice budgétaire.",
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(
        operation_summary="Créer un exercice budgétaire",
        operation_description="Permet de créer un nouvel exercice budgétaire.",
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(
        operation_summary="Mettre à jour un exercice budgétaire",
        operation_description="Permet de mettre à jour un exercice budgétaire existant.",
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="destroy",
    decorator=swagger_auto_schema(
        operation_summary="Supprimer un exercice budgétaire",
        operation_description="Supprime un exercice budgétaire existant.",
        manual_parameters=[auth_header_param]
    )
)
class BudgetExerciseViewSet(ModelViewSet):
    serializer_class = BudgetExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BudgetExercise.objects.all()

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()