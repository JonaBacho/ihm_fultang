from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from celery import shared_task
from django.utils.timezone import now

class EmailManager:
    TEMPLATES = {
        'staff_account_created': 'emails/staff_account_created.html',
        'staff_action_notification': 'emails/staff_action_notification.html',
        'patient_registered': 'emails/patient_registered.html',
        'patient_action_notification': 'emails/patient_action_notification.html',
    }

    @classmethod
    def _send_email(cls, subject, recipient, template_name, context):
        html_content = render_to_string(template_name, context)
        msg = EmailMultiAlternatives(
            subject=subject,
            body=html_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient]
        )
        msg.attach_alternative(html_content, "text/html")
        return msg.send()

    @classmethod
    def send_staff_account_created(cls, user, reset_link):
        context = {
            'user': user,
            'reset_link': reset_link,
            'role': user.get_role_display()
        }
        cls._trigger_task.delay(
            "Création de compte - Hôpital [Nom]",
            user.email,
            'staff_account_created',
            context
        )

    @classmethod
    def send_staff_action_notification(cls, staff, action_details):
        context = {
            'staff': staff,
            'action': action_details,
            'action_date': now()
        }
        cls._trigger_task.delay(
            f"Notification d'action - {action_details['type']}",
            staff.email,
            'staff_action_notification',
            context
        )

    @classmethod
    def send_patient_registered(cls, patient):
        context = {
            'patient': patient,
            'registration_date': now()
        }
        cls._trigger_task.delay(
            "Bienvenue à l'hôpital [Nom]",
            patient.email,
            'patient_registered',
            context
        )

    @classmethod
    def send_patient_action_notification(cls, patient, action_details, medical_staff):
        context = {
            'patient': patient,
            'action': action_details,
            'medical_staff': medical_staff,
            'action_date': now()
        }
        cls._trigger_task.delay(
            f"Notification médicale - {action_details['type']}",
            patient.email,
            'patient_action_notification',
            context
        )

    @shared_task(bind=True, max_retries=3)
    def _trigger_task(self, subject, recipient, template_type, context):
        try:
            return self._send_email(subject, recipient, self.TEMPLATES[template_type], context)
        except Exception as e:
            self.retry(exc=e, countdown=30)