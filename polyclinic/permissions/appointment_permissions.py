from rest_framework.permissions import BasePermission

from authentication.user_helper import fultang_user


class AppointmentPermissions(BasePermission):

    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "create", "retrieve", "update", "partial_update"]:
            return user.is_authenticated and (user.role == "Admin" or user.role == "Doctor")
        return False

    def has_object_permission(self, request, view, obj):
        user, _ = fultang_user(request)
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if user.role == "Admin":
            return True
        elif user.role == "Doctor" and view.action != "destroy":
            return True