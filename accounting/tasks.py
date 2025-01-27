from django.utils import timezone
from accounting.models import BudgetExercise, Account, AccountState
from datetime import datetime, timedelta
from celery import shared_task

@shared_task
def new_budget_exercise():
    print("Executing scheduled task now...")

    # Calculer les dates de début et de fin de l'exercice budgétaire
    start_date = timezone.now().replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
    end_date = start_date.replace(month=12, day=31, hour=23, minute=59, second=59, microsecond=999)

    # Créer le nouvel exercice budgétaire
    budget_exercise = BudgetExercise.objects.create(
        start=start_date,
        end=end_date
    )

    # Parcourir tous les comptes existants et créer un AccountState pour chacun
    accounts = Account.objects.all()
    for account in accounts:
        AccountState.objects.create(
            soldeReel=0,  # Initialiser le solde réel à 0
            soldePrevu=0,  # Initialiser le solde prévu à 0
            budgetExercise=budget_exercise,
            account=account
        )

    print(f"New budget exercise created: {budget_exercise.id}")

    # This function will be executed at the scheduled time