from rest_framework.permissions import BasePermission


class PatientAccessPermission(BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "create", "retrieve", "update", "partial_update"] or request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated and user.role in ["Admin", "Nurse", "Receptionist"]
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if user.role == "Admin":
            return True
        elif user.role in ["Receptionist", "Nurse"]  and view.action != "destroy":
            return True
        return False