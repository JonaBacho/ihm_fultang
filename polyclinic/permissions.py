from rest_framework.permissions import BasePermission
from rest_framework import permissions


# sera l'equivalent de notre customuserpermission
class MedicalStaffPermission(BasePermission):

    #edit_methods = ("POST", "PUT", "PATCH")

    def has_permission(self, request, view):
        # Autoriser uniquement l'utilisateur avec le rôle 'Admin' pour les actions de liste, de création, de mise à jour et de suppression.
        if view.action in ["list", "create", "destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["retrieve", "update", "partial_update"]:
            return request.user.is_authenticated
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if request.user.role == "Admin":
            return True
        # Autoriser un utilisateur à accéder uniquement à ses propres informations
        elif view.action == "retrieve":
            return obj == request.user
        # Autoriser la mise à jour partielle si l'utilisateur est lui-même
        elif view.action in ["update", "partial_update"]:
            return obj == request.user
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