from rest_framework.permissions import BasePermission


class PatientAccessPermission(BasePermission):

    def has_permission(self, request, view):
        if view.action in ["destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["list", "create", "retrieve", "update", "partial_update"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            return request.user.is_authenticated and request.user.role in ["Admin", "Nurse", "Receptionist"]
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if request.user.role == "Admin":
            return True
        elif request.user.role in ["Receptionist", "Nurse"]  and view.action != "destroy":
            return True
        return False