from django.core.management.base import BaseCommand
from polyclinic.models import Medicament
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

class Command(BaseCommand):
    help = "Remplit la table Medicament avec des données factices."

    def handle(self, *args, **kwargs):
        # Configuration des données factices
        medicament_names = [
            "Paracetamol", "Aspirin", "Ibuprofen", "Amoxicillin", "Metformin",
            "Omeprazole", "Ciprofloxacin", "Atorvastatin", "Azithromycin", "Losartan"
        ]

        descriptions = [
            "Pain reliever", "Anti-inflammatory", "Antibiotic for infections",
            "Treatment for diabetes", "Stomach acid reducer",
            "Cholesterol control", "Broad-spectrum antibiotic",
            "Blood pressure control", "Heart health", "Cold and flu relief"
        ]

        statuses = ["valid", "invalid"]

        # Générer 20 médicaments
        for _ in range(20):
            name = random.choice(medicament_names)
            description = random.choice(descriptions)
            status = random.choice(statuses)
            quantity = random.randint(1, 100)
            price = round(random.uniform(500, 10000), 2)  # Prix entre 500 et 10 000
            expiryDate = fake.date_time_between(start_date="+30d", end_date="+2y")  # Entre 1 mois et 2 ans

            # Créer un médicament
            medicament = Medicament.objects.create(
                name=name,
                quantity=quantity,
                status=status,
                price=price,
                expiryDate=expiryDate,
                description=description,
            )
            self.stdout.write(self.style.SUCCESS(f"Médicament créé: {medicament.name} (Qté: {medicament.quantity}, Prix: {medicament.price} FCFA)"))

        self.stdout.write(self.style.SUCCESS("La table Medicament a été remplie avec succès !"))
