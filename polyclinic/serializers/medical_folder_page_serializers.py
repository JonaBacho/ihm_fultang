from rest_framework import serializers
from polyclinic.models import MedicalFolderPage
from polyclinic.serializers.parameters_serializers import ParametersSerializer, ParametersCreateSerializer
from django.utils.timezone import now
from datetime import timedelta
from rest_framework.exceptions import ValidationError


class MedicalFolderPageSerializer(serializers.ModelSerializer):
    parameters = ParametersSerializer(required=False, many=False)

    class Meta:
        model = MedicalFolderPage
        fields = '__all__'

class MedicalFolderPageCreateSerializer(serializers.ModelSerializer):
    parameters = ParametersCreateSerializer(required=False)

    class Meta:
        model = MedicalFolderPage
        exclude = ['id', 'pageNumber', 'idMedicalStaff']

    def save(self, **kwargs):
        instance = self.instance
        if instance:
            # Mise à jour : aucune validation spécifique liée à la création
            return super().save(**kwargs)

        medical_folder = self.validated_data.get('idMedicalFolder')
        medical_staff = self.validated_data.get('idMedicalStaff')

        if not medical_folder:
            raise ValidationError({"details": "Le dossier médical (idMedicalFolder) est requis."})

        # 2 semaines en arrière
        two_weeks_ago = now() - timedelta(weeks=2)

        # Compter le nombre de pages créées pour ce dossier médical par l'infirmière dans les 2 dernières semaines
        recent_pages_count = MedicalFolderPage.objects.filter(
            idMedicalFolder=medical_folder,
            idMedicalStaff=medical_staff,
            addDate__gte=two_weeks_ago
        ).count()

        if recent_pages_count >= 2:
            raise ValidationError(
                {"details": "Vous ne pouvez créer que 2 pages médicales pour ce dossier médical toutes les 2 semaines."}
            )
        else:
            # Appeler la méthode save parente avec les kwargs
            return super().save(**kwargs)

