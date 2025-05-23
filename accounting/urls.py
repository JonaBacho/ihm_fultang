from rest_framework.routers import DefaultRouter
from django.urls import path

from accounting.api_views.account_state_api_view import AccountStateViewSet
from accounting.api_views.accounting_stats import AccountingStatsAPI
from accounting.api_views.buget_exercise_api_view import BudgetExerciseViewSet
from accounting.api_views.account_api_view import AccountViewSet
from accounting.api_views.facture_api_view import FactureViewSet
from accounting.api_views.financial_operation_api_view import FinancialOperationViewSet

router = DefaultRouter()
router.register(r'acccount-state', AccountStateViewSet, basename='account-state')
router.register('budget-exercise', BudgetExerciseViewSet, basename='budget-exercise')
router.register(r'account', AccountViewSet, basename='account')
router.register(r'facture', FactureViewSet, basename='facture')
router.register(r'financial-operation', FinancialOperationViewSet, basename='financial-operation')

urlpatterns = [path('statistics/', AccountingStatsAPI.as_view(), name='account-statistics'),]
urlpatterns += router.urls