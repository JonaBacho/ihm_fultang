from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Appointment
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import AppointmentSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Appointmaent", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class AppointmentViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]

    def get_queryset(self):
        queryset = Appointment.objects.all()
        return queryset

    def get_serializer_class(self):
        return AppointmentSerializer

    def perform_create(self, serializer):
        serializer.save()