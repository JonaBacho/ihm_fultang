from django.conf import settings
from django.db import models
from django.utils import timezone

class BudgetExercise(models.Model):
    start = models.DateTimeField(default=timezone.now)
    end = models.DateTimeField()


class Account(models.Model):
    number = models.IntegerField(default=0)
    libelle = models.CharField(max_length=255)


class AccountState(models.Model):
    soldeReel = models.FloatField(default=0)
    soldePrevu = models.FloatField(default=0)

    budgetExercise = models.ForeignKey('BudgetExercise', on_delete=models.CASCADE)
    account = models.ForeignKey('Account', on_delete=models.CASCADE)


class FinancialOperation(models.Model):
    name = models.CharField(max_length=255)

    account = models.ForeignKey('Account', on_delete=models.CASCADE)

class Facture(models.Model):
    montant = models.FloatField(default=0)
    type = models.CharField(max_length=255)

    financialOperation = models.ForeignKey('FinancialOperation', on_delete=models.CASCADE)




