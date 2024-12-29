from rest_framework.permissions import BasePermission
from polyclinic.models import PatientAccess

class MedicalFolderPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ["destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["list", "retrieve"]:
            return request.user.is_authenticated and (request.user.role in ["Admin", "Receptionist", "Nurse", "Doctor"])
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return request.user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if request.user.role == "Admin":
            return True
        elif view.action in ["list", "retrieve"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            return PatientAccess.objects.filter(
                    idPatient=obj,
                    idMedicalStaff=request.user,
                    access=True
                ).exists()
        elif (request.user.role in ["Receptionist", "Nurse", "Doctor"]) and view.action not in ["destroy", "create", "update", "partial_update"]:
            return True
        return False