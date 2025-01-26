from rest_framework.permissions import BasePermission
from authentication.user_helper import fultang_user

class AccountingStaffPermission(BasePermission):

    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        # Autoriser uniquement l'utilisateur avec le rôle 'Admin' pour les actions de liste, de création, de mise à jour et de suppression.
        if view.action in ["create", "destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update"]:
            return user.is_authenticated
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        user, _ = fultang_user(request)
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if user.role == "Admin":
            return True
        # Autoriser un utilisateur à accéder uniquement à ses propres informations
        elif view.action in ["update", "partial_update", "retrieve"]:
            return obj == user
        return False