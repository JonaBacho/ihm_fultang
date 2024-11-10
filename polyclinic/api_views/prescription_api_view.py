from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Prescription
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import PrescriptionSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator

@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Information sur une prescription", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class PrescriptionViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]

    def get_queryset(self):
        queryset = Prescription.objects.all()
        return queryset

    def get_serializer_class(self):
        return PrescriptionSerializer

    def perform_create(self, serializer):
        serializer.save()