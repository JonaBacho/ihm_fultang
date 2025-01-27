from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Bill, MedicalFolderPage
from accounting.models import FinancialOperation, Account
from polyclinic.permissions.bill_permissions import BillPermissions
from polyclinic.serializers.bill_serializers import BillSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

tags = ["bill"]
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
        manual_parameters=[auth_header_param],
        tags = tags
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
        manual_parameters=[auth_header_param],
        tags = tags
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
        manual_parameters=[auth_header_param],
        tags = tags
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
        manual_parameters=[auth_header_param],
        tags = tags
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
        manual_parameters=[auth_header_param],
        tags = tags
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
        manual_parameters=[auth_header_param],
        tags = tags
    )
)
class BillViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, BillPermissions]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Bill.objects.all()
        return queryset

    def get_serializer_class(self):
        return BillSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()


    @swagger_auto_schema(
        method='get',
        operation_summary="Lister toutes les factures d'un compte",
        operation_description="Retourne toutes les factures associées à un compte spécifique.",
        manual_parameters=[
            openapi.Parameter(
                'account_id', openapi.IN_QUERY, 
                type=openapi.TYPE_INTEGER, 
                description="ID du compte", 
                required=True
            ),
            auth_header_param
        ],
        tags=["bill"]
    )
    @action(detail=False, methods=['get'])
    def get_for_account(self, request):
        # Récupérer account_id depuis les paramètres de requête
        account_id = request.query_params.get('account_id')

        # Vérifier si account_id est fourni
        if not account_id:
            return Response(
                {"error": "Le paramètre 'account_id' est requis dans les paramètres de la requête."},
                status=status.HTTP_400_BAD_REQUEST
            )

        account = Account.objects.filter(id=account_id).first()
        if not account:
            return Response(
                {"error": "Aucun compte trouvé avec cet ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        operations = FinancialOperation.objects.filter(account=account)
        bills = Bill.objects.filter(operation__in=operations)

        serializer = self.get_serializer(bills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    @swagger_auto_schema(
        method='patch',
        operation_summary="Approuver une facture",
        operation_description="Cette route permet d'approuver une facture en mettant à jour son champ 'isApproved' à True.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'isApproved': openapi.Schema(type=openapi.TYPE_BOOLEAN, description="Statut d'approbation de la facture"),
            },
            required=['isApproved']
        ),
        manual_parameters=[auth_header_param],
        tags=["bill"]
    )
    @action(detail=True, methods=['patch'])
    def account(self, request, pk=None):
    
        try:
            bill = Bill.objects.get(id=pk)
        except Bill.DoesNotExist:
            return Response(
                {"error": "Facture non trouvée."},
                status=status.HTTP_404_NOT_FOUND
            )

        if bill.isApproved:
            return Response(
                {"error": "La facture est déjà approuvée."},
                status=status.HTTP_400_BAD_REQUEST
            )

        bill.isApproved = True
        bill.save()

        serializer = self.get_serializer(bill)

        return Response(serializer.data, status=status.HTTP_200_OK)