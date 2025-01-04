from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

# personnalisation des serializers pour le login
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Vérification de l'état de l'utilisateur
        if not self.user.is_active:
            raise AuthenticationFailed("Cet utilisateur est inactif. Veuillez contacter l'administrateur.")

        # Ajoutez des informations supplémentaires sur l'utilisateur
        data['user'] = dict()
        #data['user']['id'] = self.user.id
        data['user']['username'] = self.user.username
        data['user']['email'] = self.user.email
        data['user']['role'] = self.user.role

        return data