from rest_framework import serializers
from polyclinic.models import MedicalStaff


class MedicalStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalStaff
        exclude = ['password']
        #fields = ['id', 'first_name', 'last_name']

    """
    def validate(self, attrs):
        if self.instance is None and 'id' in attrs:  # L'objet est en création
            raise serializers.ValidationError("L'ID ne peut pas être défini manuellement.")
        return attrs
    """

class MedicalStaffCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ne pas inclure le mot de passe dans la réponse

    class Meta:
        model = MedicalStaff
        exclude = ['id', 'is_superuser', 'groups', 'user_permissions', 'date_joined', 'last_login']

    def create(self, validated_data):
        # Extraire les champs nécessaires
        password = validated_data.pop('password', None)
        is_staff = validated_data.pop('is_staff',True)
        is_superuser = validated_data.pop('is_superuser', False)
        is_active = validated_data.pop('is_active', True)

        # Créer l'utilisateur avec le manager
        user = MedicalStaff.objects.create_user(
            password=password,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
            **validated_data
        )
        return user