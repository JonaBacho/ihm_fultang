from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from accounting.serializers import FinancialOperationSerializer
from accounting.models import FinancialOperation
from rest_framework.viewsets import ModelViewSet


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
        operation_summary="Lister les opérations financières",
        operation_description="Retourne une liste paginée des opérations financières.",
        manual_parameters=[auth_header_param]
    )
)
class FinancialOperationViewSet(ModelViewSet):
    serializer_class = FinancialOperationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FinancialOperation.objects.select_related('account').all()