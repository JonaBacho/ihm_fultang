from rest_framework.permissions import BasePermission
from polyclinic.models import PatientAccess

class PatientPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ["destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["list", "create", "retrieve", "update", "partial_update"]:
            return request.user.is_authenticated and (request.user.role == "Admin" or request.user.role == "Receptionist")
        elif view.action in ["list", "retrieve", "update", "partial_update"]:
            return request.user.is_authenticated and (request.user.role == "Receptionist" or request.user.role == "Admin" or request.user.role == "Nurse")
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return request.user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if request.user.role == "Admin":
            return True
        elif request.user.role in ["Receptionist", "Nurse"] and view.action not in ["destroy", "create"]:
            return True
        elif view.action in ["list", "retrieve", "update", "partial_update"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            return PatientAccess.objects.filter(
                    idPatient=obj,
                    idMedicalStaff=request.user,
                    access=True
                ).exists()
        elif request.user.role == "Nurse" and view.action not in ["create", "destroy"]:
            return True
        return False