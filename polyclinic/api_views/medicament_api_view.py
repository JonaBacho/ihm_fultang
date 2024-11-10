from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Medicament
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import MedicamentSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Information sur les medicaments", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class MedicamentViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]

    def get_queryset(self):
        queryset = Medicament.objects.all()
        return queryset

    def get_serializer_class(self):
        return MedicamentSerializer

    def perform_create(self, serializer):
        serializer.save()