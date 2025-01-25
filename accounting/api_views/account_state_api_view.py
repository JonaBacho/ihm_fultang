from accounting.models import AccountState
from accounting.serializers import AccountStateSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
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
        operation_summary="Lister les états de compte",
        operation_description="Retourne une liste paginée des états de compte.",
        manual_parameters=[auth_header_param]
    )
)
class AccountStateViewSet(ModelViewSet):
    serializer_class = AccountStateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AccountState.objects.all()