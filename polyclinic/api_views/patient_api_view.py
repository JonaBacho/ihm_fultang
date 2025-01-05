from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Patient, PatientAccess, MedicalFolder, MedicalStaff
from polyclinic.permissions.patient_access_permissions import PatientAccessPermission
from polyclinic.permissions.patient_permissions import PatientPermission
from polyclinic.serializers.patient_access_serializers import PatientAccessSerializer
from polyclinic.serializers.patient_serializers import PatientSerializer, PatientCreateSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.utils.timezone import now


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
        operation_summary="Lister les objets",
        operation_description=(
            "Cette route retourne une liste paginée de tous les objets du modèle. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(
        operation_summary="Récupérer un objet",
        operation_description=(
            "Cette route retourne les détails d'un objet spécifique en fonction de son ID. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(
        operation_summary="Créer un nouvel objet",
        operation_description=(
            "Cette route permet de créer un nouvel objet. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(
        operation_summary="Mettre à jour un objet",
        operation_description=(
            "Cette route permet de mettre à jour complètement un objet existant en fonction de son ID. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="partial_update",
    decorator=swagger_auto_schema(
        operation_summary="Mise à jour partielle d'un objet",
        operation_description=(
            "Cette route permet de mettre à jour partiellement un objet existant en fonction de son ID. "
            "Les données doivent être envoyées dans le corps de la requête. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
@method_decorator(
    name="destroy",
    decorator=swagger_auto_schema(
        operation_summary="Supprimer un objet",
        operation_description=(
            "Cette route permet de supprimer un objet existant en fonction de son ID. "
            "L'authentification est requise pour accéder à cette ressource."
        ),
        manual_parameters=[auth_header_param]
    )
)
class PatientViewSet(ModelViewSet):

    #permission_classes = [IsAuthenticated, PatientPermission]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        """
        user = self.request.user
        if user.role=="Admin" or user.role=="Receptionist":
            return Patient.objects.all()

        return Patient.objects.filter(
            id__in=PatientAccess.objects.filter(
                idMedicalStaff=user,
                access=True
            ).values_list("idPatient", flat=True)
        )
        """
        return Patient.objects.all()

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return PatientCreateSerializer
        else:
            return PatientSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')

        gender = serializer.validated_data['gender']
        cni_number = serializer.validated_data['cniNumber']

        if gender is None or cni_number is None:
            return Response("gender ou cni_number absent", status=status.HTTP_400_BAD_REQUEST)

        # creation de dossier medical du patien
        mfolder = MedicalFolder(folderCode=gender + cni_number, isClosed=False)
        mfolder.save()
        serializer.validated_data['idMedicalFolder'] = mfolder.pk
        patient_serializer = PatientSerializer(data=serializer.validated_data)
        patient_serializer.is_valid(raise_exception=True)
        patient_serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    @swagger_auto_schema(
        operation_description="Permet de retirer l'access d'un staff à un patient",
        responses={
            204: openapi.Response(description="Acess au patient retiré"),
            208: openapi.Response(description="Accès au patient déjà retiré"),
            403: openapi.Response(description="Token invalide ou expiré"),
            404: openapi.Response(description="Access non existent"),
            400: openapi.Response(description="Bad request"),
        },
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="ID dU medical staff concerné", type=openapi.TYPE_INTEGER, required=True),
            auth_header_param
        ]
    )
    @action(methods=['post'], detail=True, url_path='remove-access/(?P<id>[^/.]+)', permission_classes=[PatientAccessPermission])
    def remove_access(self, request, id=None, *args, **kwargs):
        if id is None:
            return Response({'details': "l'id du médical staff est requis"},
                            status=status.HTTP_400_BAD_REQUEST, content_type='application/json')
        try:
            patient = self.get_object()
            medical_staff = MedicalStaff.objects.get(id=id)
            patient_access = PatientAccess.objects.filter(idPatient=patient)
            patient_access = patient_access.filter(idMedicalStaff=medical_staff).first()
            if patient_access.access:
                patient_access.access = False
                patient_access.lostAt = now()
                patient_access.save()
                serializer = PatientAccessSerializer(patient_access)
                return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'details': "ce medical staff n'a déjà pas d'accès"}, status=status.HTTP_208_ALREADY_REPORTED,
                                content_type='application/json')
        except MedicalStaff.DoesNotExist:
            return Response({'details': 'MedicalStaff not found'}, status=status.HTTP_404_NOT_FOUND)
        except Patient.DoesNotExist:
            return Response({'details': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Permet de donner l'access d'un staff à un patient",
        responses={
            201: openapi.Response(description="Acess au patient cree"),
            204: openapi.Response(description="Accces déjà existant"),
            403: openapi.Response(description="Token invalide ou expiré"),
            404: openapi.Response(description="Access non existent"),
            400: openapi.Response(description="Bad request"),
        },
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="ID dU medical staff concerné",
                              type=openapi.TYPE_INTEGER, required=True),
            auth_header_param
        ]
    )
    @action(methods=['post'], detail=True, url_path='add-access/(?P<id>[^/.]+)', permission_classes=[PatientAccessPermission])
    def add_access(self, request, id=None, *args, **kwargs):
        if id is None:
            return Response({'details': "id du medical staff est requis"},
                            status=status.HTTP_400_BAD_REQUEST, content_type='application/json')
        try:
            patient = self.get_object()
            medical_staff = MedicalStaff.objects.get(id=id)
            patient_access = PatientAccess.objects.filter(idPatient=patient)
            patient_access = patient_access.filter(idMedicalStaff=medical_staff).first()
            if patient_access:
                patient_access.access = True
                patient_access.save()
                serializer = PatientAccessSerializer(patient_access)
                return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
            else:
                patient_access = PatientAccess.objects.create(idPatient=patient, idMedicalStaff=medical_staff, access=True)
                serializer = PatientAccessSerializer(patient_access)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except MedicalStaff.DoesNotExist:
            return Response({'details': 'MedicalStaff not found'}, status=status.HTTP_404_NOT_FOUND)
        except Patient.DoesNotExist:
            return Response({'details': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
