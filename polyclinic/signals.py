from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Patient
from polyclinic.services.emails_manager import EmailManager
from django.urls import reverse
from django.conf import settings

@receiver(post_save, sender=Patient)
def send_account_creation_email(sender, instance, created, **kwargs):
    print("ici")
    if created:
        print("In road")
        EmailManager.send_patient_registered(instance)
        print("After")