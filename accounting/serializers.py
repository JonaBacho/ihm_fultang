from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
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

class AccountStateCreateSerializer(ModelSerializer):
    class Meta:
        model = AccountState
        exclude = ['id']


class FinancialOperationSerializer(ModelSerializer):
    class Meta:
        model = FinancialOperation
        fields = '__all__'

class FactureSerializer(ModelSerializer):
    class Meta:
        model = Facture
        fields = '__all__'

class AccountingViewSerializer(ModelSerializer):
    soldeReel = serializers.FloatField(default=0)
    soldePrevu = serializers.FloatField(default=0)

    account = AccountSerializer()
    
    class Meta:
        model = AccountState
        fields = ['id', 'soldeReel', 'soldePrevu', 'account']
