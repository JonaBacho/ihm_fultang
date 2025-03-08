from rest_framework.viewsets import ModelViewSet
from polyclinic.models import Medicament
from polyclinic.permissions.medicament_permissions import MedicamentPermissions
from polyclinic.serializers.medicament_serializers import MedicamentSerializer
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated

tags = ["medicament"]
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
        tags=tags,
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
        tags=tags,
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
        tags=tags,
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
        tags=tags,
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
        tags=tags,
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
        tags=tags,
    )
)
class MedicamentViewSet(ModelViewSet):

    permission_classes = [IsAuthenticated, MedicamentPermissions]

    def get_queryset(self):
        queryset = Medicament.objects.all()
        return queryset

    def get_serializer_class(self):
        return MedicamentSerializer

    def perform_create(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()

    def perform_update(self, serializer):
        if 'id' in serializer.validated_data:
            serializer.validated_data.pop('id')
        serializer.save()






from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, F, ExpressionWrapper, DecimalField
from django.utils import timezone

from polyclinic.models import PharmacyCategory, PharmacyProduct, PharmacyInventoryMovement
from polyclinic.serializers import (
    PharmacyCategorySerializer, 
    PharmacyProductSerializer,
    PharmacyProductDetailSerializer,
    PharmacyInventoryMovementSerializer,
    ProductStockSerializer,
    PharmacyInventoryReportSerializer
)

class PharmacyCategoryViewSet(viewsets.ModelViewSet):
    queryset = PharmacyCategory.objects.all()
    serializer_class = PharmacyCategorySerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['active']
    
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Get all products for a specific category"""
        category = self.get_object()
        products = PharmacyProduct.objects.filter(category=category)
        serializer = PharmacyProductSerializer(products, many=True)
        return Response(serializer.data)

class PharmacyProductViewSet(viewsets.ModelViewSet):
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'generic_name', 'brand', 'description']
    filterset_fields = ['category', 'status', 'requires_prescription', 'is_medication']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacyProductDetailSerializer
        return PharmacyProductSerializer
    
    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Get products with stock below minimum level"""
        low_stock_products = PharmacyProduct.objects.filter(
            current_stock__lte=F('min_stock_level')
        )
        serializer = ProductStockSerializer(low_stock_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def expiring_soon(self, request):
        """Get products expiring within the next 90 days"""
        expiry_threshold = timezone.now().date() + timezone.timedelta(days=90)
        expiring_products = PharmacyProduct.objects.filter(
            expiry_date__lte=expiry_threshold,
            expiry_date__gte=timezone.now().date()
        )
        serializer = PharmacyProductSerializer(expiring_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def inventory_value(self, request):
        """Get total inventory value"""
        total_value = PharmacyProduct.objects.annotate(
            value=ExpressionWrapper(
                F('current_stock') * F('price'),
                output_field=DecimalField()
            )
        ).aggregate(Sum('value'))
        
        return Response({
            'total_value': total_value['value__sum'] or 0
        })
    
    @action(detail=True, methods=['post'])
    def adjust_stock(self, request, pk=None):
        """
        Adjust product stock with a reason
        - quantity: int (positive to add, negative to remove)
        - notes: string (reason for adjustment)
        """
        product = self.get_object()
        quantity = request.data.get('quantity', 0)
        notes = request.data.get('notes', 'Manual adjustment')
        
        try:
            quantity = int(quantity)
            # Don't allow stock to go negative
            if product.current_stock + quantity < 0:
                return Response(
                    {"error": "Cannot reduce stock below zero"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            # Create movement record
            movement = PharmacyInventoryMovement.objects.create(
                product=product,
                movement_type='adjustment',
                quantity=quantity,
                unit_price=product.price,
                total_price=product.price * quantity,
                notes=notes,
                staff=request.user.medicalstaff  # Assuming staff user is logged in
            )
            
            return Response(PharmacyInventoryMovementSerializer(movement).data)
        
        except ValueError:
            return Response(
                {"error": "Quantity must be a valid integer"},
                status=status.HTTP_400_BAD_REQUEST
            )
