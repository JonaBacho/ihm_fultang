from rest_framework.viewsets import ModelViewSet
from polyclinic.models import MedicalStaff
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import MedicalStaffSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Information sur le personnel de l'hopital", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class MedicalStaffViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]

    def get_queryset(self):
        queryset = MedicalStaff.objects.all()
        return queryset

    def get_serializer_class(self):
        return MedicalStaffSerializer

    def perform_create(self, serializer):
        serializer.save()


