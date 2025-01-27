from rest_framework import permissions

from authentication.user_helper import fultang_user


class ConsultationPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update"]:
            return user.is_authenticated and (user.role in ["Admin", "Receptionist", "Nurse", "Doctor"])
        elif view.action == "create":
            return user.is_authenticated and user.role in ["Admin", "Nurse", "Receptionist"]
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False