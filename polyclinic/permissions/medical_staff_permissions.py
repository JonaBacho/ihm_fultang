from rest_framework.permissions import BasePermission
from rest_framework import permissions

from authentication.user_helper import fultang_user


# sera l'equivalent de notre customuserpermission
class MedicalStaffPermission(BasePermission):

    #edit_methods = ("POST", "PUT", "PATCH")

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

    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_authenticated:
            return True
        return True  # à modifier plus tard

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        elif request.method in permissions.SAFE_METHODS:
            return True
        elif request.method.upper() == "PATCH" and obj.author == request.user:
            return True
        elif request.user.is_authenticated and request.method.upper() == "PUT":
            return True
        elif request.user.is_staff and request.method not in self.edit_methods:
            return True
        else:
            return True  # à modifier plus tard
    """