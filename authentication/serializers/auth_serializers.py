from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from authentication.models import MedicalStaff, ROLES, ROLES_ACCOUNTING, USER_TYPE
from rest_framework import serializers


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):

        # Authentifier l'utilisateur avec les informations d'identification
        authenticated_user = self.authenticate_user(attrs)
        if not authenticated_user:
            raise AuthenticationFailed("Nom d'utilisateur ou mot de passe incorrect.")

        # Vérifier si l'utilisateur est actif
        if not authenticated_user.is_active:
            raise AuthenticationFailed("Cet utilisateur est inactif. Veuillez contacter l'administrateur.")


        # Générer le token JWT
        refresh = self.get_token(authenticated_user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': authenticated_user.username,
                'email': authenticated_user.email,
                'role': authenticated_user.role,
                'user_type': authenticated_user.userType,
            }
        }

        return data

    def authenticate_user(self, attrs):
        """
        Authentifie l'utilisateur en utilisant les informations d'identification fournies.
        """
        username = attrs.get(self.username_field)
        password = attrs.get('password')

        if username and password:
            try:
                user = MedicalStaff.objects.get(username=username)
                if user.check_password(password):
                    return user
            except MedicalStaff.DoesNotExist:
                return None
        return None


class RegistrationSerializer(serializers.ModelSerializer):
    userType = serializers.ChoiceField(choices=USER_TYPE, write_only=False)
    role = serializers.ChoiceField(choices=ROLES_ACCOUNTING + ROLES, write_only=False)

    class Meta:
        model = MedicalStaff
        fields = ['username', 'password', 'email', 'gender', 'phoneNumber', 'cniNumber', 'birthDate', 'address', 'userType', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        userType = validated_data['userType']
        password = validated_data.pop('password')
        role = validated_data['role']

        # Créer l'utilisateur
        user = MedicalStaff.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        # Générer un token JWT pour le nouvel utilisateur
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Ajouter le token et les informations de l'utilisateur à la réponse
        response_data = {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'userType': userType,
                'role': role,
            },
            'token': token,
        }

        return response_data