from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Exam
from polyclinic.permissions import MedicalStaffPermission
from polyclinic.serializers import ExamSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator


@method_decorator(swagger_auto_schema(manual_parameters=[
    openapi.Parameter(name="Information sur les examens", in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
]), name="list")
class ExamViewSet(ModelViewSet):

    permission_classes = [MedicalStaffPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Exam.objects.all()
        return queryset

    def get_serializer_class(self):
        return ExamSerializer

    def perform_create(self, serializer):
        serializer.save()