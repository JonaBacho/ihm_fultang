from rest_framework.viewsets import ModelViewSet
from polyclinic.models import MedicalStaff
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import MedicalStaffSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Information sur le personnel de l'hopital", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class MedicalStaffViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, MedicalStaffPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = MedicalStaff.objects.all()
        return queryset

    def get_serializer_class(self):
        return MedicalStaffSerializer

    def perform_create(self, serializer):
        serializer.save()


