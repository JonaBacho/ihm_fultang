from .api_views.consultation_type_api_view import ConsultationTypeViewSet
from .api_views.appointment_api_view import AppointmentViewSet
from .api_views.bill_api_view import BillViewSet
from .api_views.consultation_api_view import ConsultationViewSet
from .api_views.department_api_view import DepartmentViewSet
from .api_views.exam_api_view import ExamViewSet
from .api_views.exam_result_api_view import ExamResultViewSet
from .api_views.exam_request_api_view import ExamRequestViewSet
from .api_views.hospitalisation_api_view import HospitalisationViewSet
from .api_views.medical_folder_api_view import MedicalFolderViewSet
from .api_views.medicament_api_view import MedicamentViewSet
from .api_views.message_api_view import MessageViewSet
from .api_views.parameters_api_view import ParametersViewSet
from .api_views.patient_access_api_view import PatientAccessViewSet
from .api_views.patient_api_view import PatientViewSet
from .api_views.prescription_api_view import PrescriptionViewSet
from .api_views.room_api_view import RoomViewSet
from authentication.api_views.medical_staff_api_views import MedicalStaffViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path
from polyclinic.api_views.chat_api_view import ChatbotView


router = DefaultRouter()
router.register(r'appointment', AppointmentViewSet, basename='appointment')
router.register(r'bill', BillViewSet, basename='bill')
router.register(r'consultation', ConsultationViewSet, basename='consultation')
router.register(r'consultation-type', ConsultationTypeViewSet, basename='consultation-type')
router.register(r'department', DepartmentViewSet, basename='department')
#router.register(r'exam', ExamViewSet, basename='exam')
router.register(r'exam-result', ExamResultViewSet, basename='exam-result')
router.register(r'exam', ExamViewSet, basename='exam')
router.register(r'exam-request', ExamRequestViewSet, basename='exam-request')
router.register(r'hospital', HospitalisationViewSet, basename='hospital')
router.register(r'medical-folder', MedicalFolderViewSet, basename='medical-folder')
router.register(r'medicament', MedicamentViewSet, basename='medicament')
router.register(r'medical-staff', MedicalStaffViewSet, basename='medical-staff')
router.register(r'message', MessageViewSet, basename='message')
#router.register(r'parameters', ParametersViewSet, basename='parameters')
#router.register(r'patient-access', PatientAccessViewSet, basename='patient-access')
router.register(r'patient', PatientViewSet, basename='patient')
router.register(r'prescription', PrescriptionViewSet, basename='prescription')
router.register(r'room', RoomViewSet, basename='room')


urlpatterns = [path('chatbot/', ChatbotView.as_view(), name='chatbot'),]
urlpatterns += router.urls



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from polyclinic.views import (
    PharmacyCategoryViewSet,
    PharmacyProductViewSet,
    PharmacyInventoryMovementViewSet
)

# Create a router for our pharmacy-related endpoints
pharmacy_router = DefaultRouter()
pharmacy_router.register(r'categories', PharmacyCategoryViewSet)
pharmacy_router.register(r'products', PharmacyProductViewSet)
pharmacy_router.register(r'inventory-movements', PharmacyInventoryMovementViewSet)

# URLs to include in your main urls.py
urlpatterns = [
    path('pharmacy/', include(pharmacy_router.urls)),
]