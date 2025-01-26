from django.contrib.auth.management.commands.createsuperuser import Command as BaseCommand
from django.core.management import CommandError
#from django.core.management.base import BaseCommand, CommandError
from accounting.models import AccountingStaff
from polyclinic.models import MedicalStaff


class Command(BaseCommand):
    help = 'Crée un superutilisateur et associe à MedicalStaff ou AccountingStaff selon le userType.'

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument(
            '--userType',
            type=str,
            choices=["Medical", "Accountant"],
            required=False,
            help="Type d'utilisateur : 'Medical' ou 'Accounting'."
        )
        parser.add_argument(
            '--role',
            type=str,
            required=False,
            help="Rôle de l'utilisateur."
        )

    def handle(self, *args, **options):
        userType = options.get('userType')
        role = options.get('role')
        username = options.get('username')
        email = options.get('email')
        password = options.get('password')

        if not role:
            raise CommandError("Le champ --role est obligatoire.")

        # Création de l'utilisateur selon le userType
        if userType == 'Medical':
            user = MedicalStaff.objects.create_superuser(
                username=username, email=email, password=password, role=role, userType=userType
            )
        elif userType == 'Accounting':
            user = AccountingStaff.objects.create_superuser(
                username=username, email=email, password=password, role=role, userType=userType
            )
        else:
            raise CommandError("userType invalide. Doit être 'Medical' ou 'Accounting'.")

        self.stdout.write(self.style.SUCCESS(
            f"Superutilisateur '{username}' ({userType}) avec rôle '{role}' créé avec succès."
        ))
