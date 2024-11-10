from rest_framework.viewsets import ModelViewSet
from polyclinic.models import ExamResult
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import ExamResultSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Exam results", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class ExamResultViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]

    def get_queryset(self):
        queryset = ExamResult.objects.all()
        return queryset

    def get_serializer_class(self):
        return ExamResultSerializer

    def perform_create(self, serializer):
        serializer.save()