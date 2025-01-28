from rest_framework import permissions

from authentication.user_helper import fultang_user


class BillPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update", "create"]:
            return user.is_authenticated and (user.role in ["Admin", "Receptionist", "Nurse", "Cashier", "Accountant"])
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False