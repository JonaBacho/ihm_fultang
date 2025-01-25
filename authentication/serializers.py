from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from polyclinic.models import MedicalStaff  # Import depuis l'app médicale
from accounting.models import AccountingStaff  # Import depuis l'app comptabilité

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Vérification de l'état de l'utilisateur
        if not self.user.is_active:
            raise AuthenticationFailed("Cet utilisateur est inactif. Veuillez contacter l'administrateur.")

        # Vérification de l'utilisateur (MedicalStaff ou AccountingStaff)
        try:
            medical_user = MedicalStaff.objects.get(username=self.user.username)
            user_type = 'medical'
        except MedicalStaff.DoesNotExist:
            try:
                accounting_user = AccountingStaff.objects.get(username=self.user.username)
                user_type = 'accounting'
            except AccountingStaff.DoesNotExist:
                raise AuthenticationFailed("Cet utilisateur n'existe pas dans les systèmes.")

        # Ajout des informations spécifiques
        data['user'] = {
            #'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'user_type': user_type,
        }
        return data
