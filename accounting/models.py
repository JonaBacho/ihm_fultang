from django.conf import settings
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError


class BudgetExercise(models.Model):
    start = models.DateTimeField(default=timezone.now)
    end = models.DateTimeField()


class Account(models.Model):
    status = [
        ("credit", "credit"),
        ("debit", "debit"),
        ("creance", "creance")
    ]
    
    number = models.IntegerField(default=0)
    libelle = models.CharField(max_length=255)
    status = models.CharField(max_length=255, choices=status, null=True)
    
    def clean(self):
        if self.libelle and self.libelle[0] in ['4', '5'] and not self.status:
            raise ValidationError("Status cannot be null if the first digit of libelle is 4 or 5")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    

class AccountState(models.Model):
    balance = models.FloatField(default=0)

    budgetExercise = models.ForeignKey('BudgetExercise', on_delete=models.CASCADE)
    account = models.ForeignKey('Account', on_delete=models.CASCADE)


class FinancialOperation(models.Model):
    name = models.CharField(max_length=255)

    account = models.ForeignKey('Account', on_delete=models.CASCADE)

class Facture(models.Model):
    montant = models.FloatField(default=0)
    type = models.CharField(max_length=255)

    financialOperation = models.ForeignKey('FinancialOperation', on_delete=models.CASCADE)




