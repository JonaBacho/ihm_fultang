from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from authentication.serializers import CustomTokenObtainPairSerializer
from rest_framework.views import APIView
from authentication.serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from polyclinic.models import MedicalStaff
from accounting.models import AccountingStaff
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegistrationView(APIView):
    @swagger_auto_schema(
        operation_summary="Enregistrer un nouvel utilisateur",
        operation_description=(
                "Cette API permet d'enregistrer un nouvel utilisateur dans le système. "
                "L'utilisateur peut être de type `Medical` (personnel médical) ou `Accountant` (personnel comptable). "
                "Un token JWT est renvoyé après l'enregistrement pour permettre à l'utilisateur de se connecter immédiatement."
        ),
        request_body=RegistrationSerializer,  # Utilisez directement le serializer ici
        responses={
            201: openapi.Response(
                description="Utilisateur enregistré avec succès",
                examples={
                    "application/json": {
                        "user": {
                            "id": 1,
                            "username": "johndoe",
                            "email": "johndoe@example.com",
                            "userType": "Medical",
                            "role": "Doctor",
                        },
                        "token": {
                            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        }
                    }
                }
            ),
            400: openapi.Response(
                description="Données invalides - vérifiez les champs obligatoires et les formats.",
                examples={
                    "application/json": {
                        "username": ["Ce champ est obligatoire."],
                        "email": ["Entrez une adresse email valide."],
                    }
                }
            ),
        }
    )
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            responses = serializer.save()
            return Response(responses, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Obtenir le profil utilisateur connecté",
        operation_description=(
                "Cette API renvoie les informations du profil de l'utilisateur connecté. "
                "Le type d'utilisateur peut être `medical`, `accountant` ou `user`. "
                "Les champs spécifiques tels que `role` sont inclus si applicables."
        ),
        responses={
            200: openapi.Response(
                description="Profil utilisateur récupéré avec succès",
                examples={
                    "application/json": {
                        "username": "johndoe",
                        "email": "johndoe@example.com",
                        "first_name": "John",
                        "last_name": "Doe",
                        "gender": "Male",
                        "cniNumber": "123456789",
                        "phoneNumber": "123-456-7890",
                        "birthDate": "1985-10-15",
                        "address": "Yaoundé - damas",
                        "userType": "medical",
                        "role": "Doctor",
                    }
                }
            ),
            401: openapi.Response(
                description="Non autorisé - l'utilisateur doit être authentifié."
            ),
        }
    )
    def get(self, request):
        user = request.user  # Récupérer l'utilisateur connecté

        # Vérifier si l'utilisateur est MedicalStaff ou AccountingStaff
        if MedicalStaff.objects.filter(pk=user.pk).exists():
            user_type = "medical"
            user_instance = MedicalStaff.objects.get(pk=user.pk)
        elif AccountingStaff.objects.filter(pk=user.pk).exists():
            user_type = "accountant"
            user_instance = AccountingStaff.objects.get(pk=user.pk)
        else:
            user_type = "user"
            user_instance = user  # Si utilisateur générique

        # Retourner les informations de l'utilisateur connecté
        user_data = {
            #"id": user_instance.id,
            "username": user_instance.username,
            "email": user_instance.email,
            "first_name": user_instance.first_name,
            "last_name": user_instance.last_name,
            "gender": user_instance.gender,
            "cniNumber": user_instance.cniNumber,
            "phoneNumber": user_instance.phoneNumber,
            "birthDate": user_instance.birthDate,
            "address": user_instance.address,
            "userType": user_type,
            "role": getattr(user_instance, "role", None),  # Récupérer `role` si disponible
        }
        return Response(user_data)


