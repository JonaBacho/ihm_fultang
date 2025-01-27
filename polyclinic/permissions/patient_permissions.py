from rest_framework.permissions import BasePermission

from authentication.user_helper import fultang_user
from polyclinic.models import PatientAccess

class PatientPermission(BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update"]:
            return user.is_authenticated and (user.role == "Receptionist" or user.role == "Admin" or user.role == "Nurse")
        elif view.action in ["create"]:
            return user.is_authenticated and (user.role == "Admin" or user.role == "Receptionist")
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        user, _ = fultang_user(request)
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if user.role == "Admin":
            return True
        elif user.role in ["Receptionist", "Nurse"] and view.action not in ["destroy", "create"]:
            return True
        elif view.action in ["list", "retrieve", "update", "partial_update"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            return PatientAccess.objects.filter(
                    idPatient=obj,
                    idMedicalStaff=user,
                    access=True
                ).exists()
        elif user.role == "Nurse" and view.action not in ["create", "destroy"]:
            return True
        return False