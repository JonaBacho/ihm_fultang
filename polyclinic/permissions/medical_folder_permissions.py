from rest_framework.permissions import BasePermission

from authentication.user_helper import fultang_user
from polyclinic.models import PatientAccess, Patient

class MedicalFolderPermission(BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve"]:
            return user.is_authenticated and (user.role in ["Admin", "Receptionist", "Nurse", "Doctor"])
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        user, _ = fultang_user(request)
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if user.role == "Admin":
            return True
        elif view.action in ["list", "retrieve"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            if user.role in ["Receptionist", "Nurse"]:
                return True
            else:
                patient = Patient.objects.get(idMedicalFolder=obj)
                return PatientAccess.objects.filter(
                        idPatient=patient,
                        idMedicalStaff=request.user,
                        access=True
                    ).exists()
        elif (user.role in ["Receptionist", "Nurse", "Doctor"]) and view.action not in ["destroy", "create", "update", "partial_update"]:
            return True
        return False