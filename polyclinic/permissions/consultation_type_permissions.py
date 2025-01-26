from rest_framework import permissions

from authentication.user_helper import fultang_user


class ConsultationTypePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        # Autoriser uniquement l'utilisateur avec le rôle 'Admin' pour les actions de liste, de création, de mise à jour et de suppression.
        if view.action in ["create", "destroy", "update", "partial_update"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve"]:
            return user.is_authenticated
        return False