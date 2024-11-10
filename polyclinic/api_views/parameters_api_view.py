from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Parameters
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import ParametersSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Parametres", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class ParametersViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Parameters.objects.all()
        return queryset

    def get_serializer_class(self):
        return ParametersSerializer

    def perform_create(self, serializer):
        serializer.save()