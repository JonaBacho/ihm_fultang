from accounting.permissions.accounting_staff_permissions import AccountingStaffPermission
from accounting.serializers import BudgetExerciseSerializer
from rest_framework.viewsets import ModelViewSet
from accounting.models import BudgetExercise, AccountState
from polyclinic.pagination import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from accounting.services.budget_exercise_service import *


tags = ["budget-exercise"]
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
        operation_summary="Lister les exercices budgétaires",
        operation_description="Retourne une liste paginée des exercices budgétaires.",
        manual_parameters=[auth_header_param],
        tags=tags,
    )
)
@method_decorator(
    name="retrieve",
    decorator=swagger_auto_schema(
        operation_summary="Récupérer un exercice budgétaire",
        operation_description="Retourne les détails d'un exercice budgétaire.",
        manual_parameters=[auth_header_param],
        tags=tags,
    )
)
@method_decorator(
    name="create",
    decorator=swagger_auto_schema(
        operation_summary="Créer un exercice budgétaire",
        operation_description="Permet de créer un nouvel exercice budgétaire.",
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
        tags=tags
    )
)
@method_decorator(
    name="update",
    decorator=swagger_auto_schema(
        operation_summary="Mettre à jour un exercice budgétaire",
        operation_description="Permet de mettre à jour un exercice budgétaire existant.",
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
@method_decorator(
    name="destroy",
    decorator=swagger_auto_schema(
        operation_summary="Supprimer un exercice budgétaire",
        operation_description="Supprime un exercice budgétaire existant.",
        manual_parameters=[auth_header_param],
        tags=tags
    )
)
class BudgetExerciseViewSet(ModelViewSet):
    serializer_class = BudgetExerciseSerializer
    permission_classes = [IsAuthenticated, AccountingStaffPermission]
    pagination_class = CustomPagination

    def get_queryset(self):
        return BudgetExercise.objects.all()

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
        operation_summary="Obtenir le compte de bilan",
        operation_description="Retourne un JSON avec les soldes réels et prévus des comptes de classe 1 à 6, classés en Actif et Passif.",
        manual_parameters=[auth_header_param],
        tags=tags
    )
    @action(detail=False, methods=['get'], permission_classes=[AccountingStaffPermission])
    def get_balance_sheet(self, request):
        immobilized_active = calculate_balance(immobilized_actives_prefixes)
        circulant_active = calculate_circulant_balance(circulant_actives_prefixes, "active")
        active_treasury = calculate_treasury(treasury_indexes, "active")
        equity = calculate_balance(equity_indexes)
        financial_debt = calculate_circulant_balance(financial_debt_prefixes)
        circulant_passive = calculate_circulant_balance(circulant_passives_prefixes, "passive")
        passive_treasury = calculate_treasury(treasury_indexes, "passive")
        active = immobilized_active['total']['soldePrevu'] + circulant_active['total']['soldePrevu'] + active_treasury['total']['soldePrevu']
        passive = equity['total']['soldePrevu'] + financial_debt['total']['soldePrevu'] + circulant_passive['total']['soldePrevu'] + passive_treasury['total']['soldePrevu']
        working_capital = equity['total']['soldePrevu'] + financial_debt['total']['soldePrevu'] - immobilized_active['total']['soldePrevu']
        working_capital_requirement = circulant_passive['total']['soldePrevu'] - circulant_active['total']['soldePrevu']
        treasury = active_treasury['total']['soldePrevu'] - passive_treasury['total']['soldePrevu']
        financial_autonomy_ratio = equity['total']['soldePrevu'] / passive if passive != 0 else None
        debt_to_equity_ratio = financial_debt['total']['soldePrevu'] / equity['total']['soldePrevu'] if equity['total']['soldePrevu'] != 0 else None
        general_liquidity = circulant_active['total']['soldePrevu'] / circulant_passive['total']['soldePrevu'] if circulant_passive['total']['soldePrevu'] != 0 else None
        stock = calculate_balance(stock_indexes)
        reduced_liquidity = (circulant_active['total']['soldePrevu'] - stock['total']['soldePrevu']) / circulant_passive['total']['soldePrevu'] if circulant_passive['total']['soldePrevu'] != 0 else None
        immediate_liquidity = treasury / circulant_passive['total']['soldePrevu'] if circulant_passive['total']['soldePrevu'] != 0 else None
        solvability_ratio = active / passive if passive != 0 else None
        return Response(
            {
                "Actif":{
                    "Immobilisations": immobilized_active,
                    "ActifCirculant": circulant_active,
                    "TresorerieActive": active_treasury,
                    "TotalActif": active
                },
                "Passif":{
                    # "RessourcesStables": equity['total']['soldePrevu'] + financial_debt['total']['soldePrevu'],
                    "RessourcesStables":{
                        "Capitaux": equity,
                        "DettesFinancieres": financial_debt
                    },
                    "PassifCirculant": circulant_passive,
                    "TresoreriePassive": passive_treasury,
                    "TotalPassif": passive
                },
                "FondsDeRoulement": working_capital,
                "BesoinEnFondsDeRoulement": working_capital_requirement,
                "TresorerieNette": treasury,
                "RatiosDeStructure":{
                    "RatioDAutonomie financiere": financial_autonomy_ratio,
                    "RatioDEndettement": debt_to_equity_ratio
                },
                "RatiosDeLiquidite":{
                    "LiquiditeGenerale": general_liquidity,
                    "LiquiditeReduite": reduced_liquidity,
                    "LiquiditeImmediate": immediate_liquidity
                },
                "RatioDeSolvabilite": solvability_ratio
            }
        )
    
    @swagger_auto_schema(
        method='get',
        operation_summary="Calculer les comptes de résultat",
        operation_description="Retourne un JSON avec les soldes réels et prévus des comptes de charges (classe 6) et produits (classe 7).",
        manual_parameters=[auth_header_param],
        tags=tags
    )
    @action(detail=False, methods=['get'], permission_classes=[AccountingStaffPermission])
    def get_income_statement(self, request):

        charges = calculate_balance(charges_prefixes)
        products = calculate_balance(products_prefixes)
        sales_figure = calculate_balance(sales_figure_prefixes)
        sold_goods = calculate_balance(sold_goods_prefixes)
        gross_margin = sales_figure['total']['soldePrevu'] - sold_goods['total']['soldePrevu']
        working_charges = calculate_balance(working_charges_prefixes)
        gross_operating_surplus = gross_margin - working_charges['total']['soldePrevu']
        depreciation_allocations = calculate_balance(depreciation_allocations_prefixes)
        provision_allocations = calculate_balance(provision_allocations_prefixes)
        working_result = gross_operating_surplus - depreciation_allocations['total']['soldePrevu'] - provision_allocations['total']['soldePrevu']
        financial_charges = calculate_balance(financial_charges_prefixes)
        taxes = calculate_balance(taxes_prefixes)
        net_result = working_result - financial_charges['total']['soldePrevu'] - taxes['total']['soldePrevu']
        return Response({
                "Charges": charges, 
                "Produits": products,
                "MargeBrute": gross_margin,
                "ExcedentBrutDExploitation": gross_operating_surplus,
                "ResultatDExploitation": working_result,
                "ResultatNet": net_result
            }
        )
        
    @swagger_auto_schema(
        method='get',
        operation_summary="Calculer l'état des flux de trésorerie",
        operation_description="Retourne l'état de la trésorerie",
        manual_parameters=[auth_header_param],
        tags=tags
    )
    @action(detail=False, methods=['get'])
    def get_treasury_flow(self, request):
        operating_cash_inflows = calculate_balance(operating_cash_inflows_prefixes)
        operating_cash_outflows = calculate_balance(operating_cash_outflows_prefixes)
        financing_cash_inflows = calculate_balance(financing_cash_inflows_prefixes)
        financing_cash_outflows = calculate_balance(financing_cash_outflows_prefixes)
        investment_cash_inflows = calculate_balance(investment_cash_inflows_prefixes)
        investment_cash_outflows = calculate_balance(investment_cash_outflows_prefixes)
        operating_treasury_flow = operating_cash_inflows['total']['soldePrevu'] - operating_cash_outflows['total']['soldePrevu']
        financing_treasury_flow = financing_cash_inflows['total']['soldePrevu'] - financing_cash_outflows['total']['soldePrevu']
        investment_treasury_flow = investment_cash_inflows['total']['soldePrevu'] - investment_cash_outflows['total']['soldePrevu']
        return Response({
            "ActivitesDExploitation":{
                "Encaissements": operating_cash_inflows,
                "Decaissements": operating_cash_outflows,
                "FluxDeTresorerieDExploitation": operating_treasury_flow
            },
            "ActivitesDInvestissement":{
                "Encaissements": investment_cash_inflows,
                "Decaissements": investment_cash_outflows,
                "FluxDeTresorerieDInvestissement": investment_treasury_flow
            },
            "ActivitesDeFinancement":{
                "Encaissements": financing_cash_inflows,
                "Decaissements": financing_cash_outflows,
                "FluxDeTresorerieDeFinancement": financing_treasury_flow
            }
        })
        
    @swagger_auto_schema(
        method='get',
        operation_summary="Calculer la balance",
        operation_description="Retourne la balance",
        manual_parameters=[auth_header_param],
        tags=tags
    )
    @action(detail=False, methods=['get'])
    def get_balance(self, request):
        all_prefixes = [str(i) for i in range(10, 80)]
        return Response({
            "balance": calculate_balance(all_prefixes)
        })