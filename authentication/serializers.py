from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from polyclinic.models import MedicalStaff, ROLES
from accounting.models import AccountingStaff, ROLES_ACCOUNTING
from rest_framework import serializers
from .models import User, USER_TYPE


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
        role = authenticated_user.role
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': authenticated_user.username,
                'email': authenticated_user.email,
                'role': role,
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
            # Vérifier si l'utilisateur existe dans nos tables
            try:
                user = MedicalStaff.objects.get(username=username)
                if user.check_password(password):
                    user.userType = 'Medical'
                    return user
            except MedicalStaff.DoesNotExist:
                try:
                    user = AccountingStaff.objects.get(username=username)
                    if user.check_password(password):
                        user.userType = 'Accountant'
                        return user
                except AccountingStaff.DoesNotExist:
                    raise AuthenticationFailed("Cet utilisateur n'existe pas dans les systèmes.")
        return None


class RegistrationSerializer(serializers.ModelSerializer):
    userType = serializers.ChoiceField(choices=USER_TYPE, write_only=False)
    role = serializers.ChoiceField(choices=ROLES_ACCOUNTING + ROLES, write_only=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'gender', 'phoneNumber', 'cniNumber', 'birthDate', 'address', 'userType', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        userType = validated_data.pop('userType')
        password = validated_data.pop('password')
        role = validated_data.pop('role')

        # Créer l'utilisateur
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        # Associer l'utilisateur au bon modèle
        if userType == "Medical":
            user = MedicalStaff.objects.create(user=user, role=role)
        elif userType == "Accountant":
            user = AccountingStaff.objects.create(user=user, role=role)

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
