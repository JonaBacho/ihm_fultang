from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from authentication.managers import CustomManager
from django.db import models
from django.utils import timezone
from authentication.models import User

ROLES_ACCOUNTING = [
    ('NoRole', 'NoRole'),
    ('Accountant', 'Accountant'),
    ('Auditor', 'Auditor'),
    ('FinanceManager', 'FinanceManager'),
]

class AccountingStaff(User):
    role = models.CharField(max_length=20, choices=ROLES_ACCOUNTING, default='Accountant')

    """
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='accountingstaff_set',  # Nom unique pour la relation
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='accountingstaff_permissions_set',  # Nom unique pour la relation
        blank=True
    )
    """

    objects = CustomManager()

    def save(self, *args, **kwargs):
        if self.pk:
            original_password = AccountingStaff.objects.get(pk=self.pk).password
            if self.password != original_password:  # Check if password has been updated
                self.set_password(self.password)
        else:
            # New instance
            self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class BudgetExercise(models.Model):
    start = models.DateTimeField(default=timezone.now)
    end = models.DateTimeField()


class ClassCompte(models.Model):
    number = models.IntegerField(default=0)
    libelle = models.CharField(max_length=255)


class AccountState(models.Model):
    soldeReel = models.FloatField(default=0)
    soldePrevu = models.FloatField(default=0)

    budgetExercise = models.ForeignKey('BudgetExercise', on_delete=models.CASCADE)
    classCompte = models.ForeignKey('ClassCompte', on_delete=models.CASCADE)


class FinancialOperation(models.Model):
    name = models.CharField(max_length=255)

    classCompte = models.ForeignKey('ClassCompte', on_delete=models.CASCADE)

class Facture(models.Model):
    montant = models.FloatField(default=0)
    type = models.CharField(max_length=255)

    financialOperation = models.ForeignKey('FinancialOperation', on_delete=models.CASCADE)




