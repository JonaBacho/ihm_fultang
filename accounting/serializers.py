from rest_framework.serializers import ModelSerializer
from accounting.models import *

class BudgetExerciseSerializer(ModelSerializer):
    class Meta:
        model = BudgetExercise
        fields = '__all__'


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class AccountStateSerializer(ModelSerializer):
    class Meta:
        model = AccountState
        fields = '__all__'


class FinancialOperationSerializer(ModelSerializer):
    class Meta:
        model = FinancialOperation
        fields = '__all__'

class FactureSerializer(ModelSerializer):
    class Meta:
        model = Facture
        fields = '__all__'
        
        