from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from accounting.serializers import FactureSerializer
from accounting.models import Facture
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
        operation_summary="Lister les factures",
        operation_description="Retourne une liste paginée des factures.",
        manual_parameters=[auth_header_param]
    )
)
class FactureViewSet(ModelViewSet):
    serializer_class = FactureSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Facture.objects.select_related('financialOperation').all()
