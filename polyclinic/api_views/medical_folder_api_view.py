from django.db.models.query import Prefetch
from rest_framework.viewsets import ModelViewSet

from authentication.user_helper import fultang_user
from polyclinic.models import MedicalFolder, MedicalFolderPage, Parameters
from polyclinic.permissions.medical_folder_permissions import MedicalFolderPermission
from polyclinic.serializers.medical_folder_serializers import MedicalFolderSerializer, MedicalFolderDetailsSerializer
from polyclinic.serializers.medical_folder_page_serializers import MedicalFolderPageCreateSerializer, MedicalFolderPageSerializer
from polyclinic.serializers.parameters_serializers import ParametersSerializer, ParametersCreateSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

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
class MedicalFolderViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, MedicalFolderPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = MedicalFolder.objects.all()
        queryset = MedicalFolder.objects.prefetch_related(
            Prefetch(
                'medicalfolderpage_set',  # Relation vers MedicalFolderPage
                queryset=MedicalFolderPage.objects.select_related('parameters')  # Relation vers Parameters
            )
        )
        return queryset

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return MedicalFolderDetailsSerializer
        else:
            return MedicalFolderSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    @swagger_auto_schema(
        operation_description="Ajouter une nouvelle page à un carnet médical. ",
        request_body=MedicalFolderPageCreateSerializer,  # Explique le corps attendu
        responses={
            201: MedicalFolderPageCreateSerializer,
            400: openapi.Response(description="Requête invalide. Vérifiez les données envoyées."),
            403: openapi.Response(description="Token invalide ou expiré."),
        },
        manual_parameters=[
            auth_header_param
        ]
    )
    @action(methods=['post'], detail=True, url_path='add-page')
    def add_page(self, request, *args, **kwargs):
        user, _ = fultang_user(self.request)
        medical_folder = self.get_object()
        number = MedicalFolderPage.objects.filter(idMedicalFolder=medical_folder).count()
        serializer = MedicalFolderPageCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(idMedicalFolder=medical_folder, pageNumber=number+1, idMedicalStaff=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Mettre à jour une page d'un cahier médical",
        request_body=MedicalFolderPageCreateSerializer,
        responses={
            200: MedicalFolderPageCreateSerializer,
            400: openapi.Response(description="Requête invalide. Vérifiez les données envoyées."),
            404: openapi.Response(description="Page inexistante"),
            403: openapi.Response(description="Token invalide ou expiré."),
        },
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_PATH,
                description="ID de la page.",
                type=openapi.TYPE_INTEGER
            )
        ]
    )
    @action(methods=['put'], detail=True, url_path='update-page/(?P<id>[^/.]+)')
    def update_page(self, request, id=None, *args, **kwargs):
        try:
            if id is None:
                return Response({'error': 'L\'ID de la page est requis.'}, status=status.HTTP_400_BAD_REQUEST)

            page = MedicalFolderPage.objects.get(id=id)

            # Vérification que la page appartient bien au carnet médical (MedicalFolder)
            medical_folder = self.get_object()
            if page.idMedicalFolder != medical_folder:
                return Response(
                    {'error': 'Cette page n\'est pas associée au carnet médical spécifié.'},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Validation et mise à jour des données
            serializer = MedicalFolderPageCreateSerializer(page, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MedicalFolderPage.DoesNotExist:
            return Response({'error': 'Page inexistante.'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Ajouter de nouveaux paramètres, une nouvelle page sera cree d'abord",
        request_body=ParametersCreateSerializer,
        responses={
            201: ParametersCreateSerializer,
            400: openapi.Response(description="Requête invalide. Vérifiez les données envoyées."),
            403: openapi.Response(description="Token invalide ou expiré."),
        }
    )
    @action(methods=['post'], detail=True, url_path='new-params')
    def new_params(self, request, *args, **kwargs):
        user, _ = fultang_user(self.request)
        medical_folder = self.get_object()
        number = MedicalFolderPage.objects.filter(idMedicalFolder=medical_folder).count()
        page_data = {'idMedicalFolder': medical_folder.id}
        page_serializer = MedicalFolderPageCreateSerializer(data=page_data)
        if page_serializer.is_valid():
            page = page_serializer.save(idMedicalStaff=user, pageNumber=number+1)
            params_serializer = ParametersCreateSerializer(data=request.data)
            if params_serializer.is_valid():
                params_serializer.save(idMedicalFolderPage=page)
                return Response(params_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(params_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(page_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Mettre à jour les paramètres d'une page",
        request_body=ParametersCreateSerializer,
        responses={
            200: ParametersCreateSerializer,
            400: openapi.Response(description="Requête invalide. Vérifiez les données envoyées."),
            403: openapi.Response(description="Token invalide ou expiré."),
        }
    )
    @action(methods=['put'], detail=False, url_path='update-params')
    def update_params(self, request, pk, *args, **kwargs):
        try:
            if pk is None:
                return Response({'error', "id du paramètre requis"}, status=status.HTTP_400_BAD_REQUEST)
            params = Parameters.objects.get(pk)
            serializer = ParametersCreateSerializer(params, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Parameters.DoesNotExist:
            return Response({'error': 'Parameters not found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Obtenir la dernière page d'un cahier médical",
        responses={
            200: MedicalFolderPageSerializer,
            404: openapi.Response(description="Page inexistante"),
            403: openapi.Response(description="Token invalide ou expiré."),
        }
    )
    @action(methods=['get'], detail=True, url_path='last-page')
    def last_page(self, request, pk=None, *args, **kwargs):
        medical_folder = self.get_object()
        #last_page = medical_folder.medicalfolderpage_set.order_by('-addDate').first()
        last_page = MedicalFolderPage.objects.filter(idMedicalFolder=medical_folder).order_by('-addDate').first()
        if last_page:
            serializer = MedicalFolderPageSerializer(last_page)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'No pages found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Obtenir les paramètres les plus récents",
        responses={200: ParametersSerializer,
                   404: openapi.Response(description="Page inexistante"),
                   403: openapi.Response(description="Token invalide ou expiré."),
        }
    )
    @action(methods=['get'], detail=True, url_path='last-params')
    def last_params(self, request, *args, **kwargs):
        medical_folder = self.get_object()
        pages = MedicalFolderPage.objects.filter(idMedicalFolder=medical_folder)
        parameters = Parameters.objects.filter(idMedicalFolderPage__in=pages)
        last_params = parameters.order_by('-addDate').first()
        if last_params:
            serializer = ParametersSerializer(last_params)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'No parameters found'}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Obtenir une page par id ou par date",
        responses={200: ParametersSerializer,
                   404: openapi.Response(description="Page inexistante"),
                   400: openapi.Response(description="Requête invalide. Vérifiez les données envoyées."),
                   403: openapi.Response(description="Token invalide ou expiré."),
        }
    )
    @action(methods=['get'], detail=True, url_path='get-page')
    def get_page(self, request, *args, **kwargs):
        id = request.GET['id']
        date = request.GET['date']
        medical_folder = self.get_object()
        pages = MedicalFolderPage.objects.filter(idMedicalFolder=medical_folder)
        if id:
            page = pages.filter(id=id).first()
            if not page:
                return Response({'error': 'Page not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = MedicalFolderPageSerializer(page)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if date:
            page = pages.filter(addDate=date).first()
            if not page:
                return Response({'error': 'Page not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = MedicalFolderPageSerializer(page)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)





