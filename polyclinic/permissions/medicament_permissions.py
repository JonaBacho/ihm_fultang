from rest_framework import permissions

class MedicamentPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if view.action in ["list", "retrieve", "partial_update"]:
            return user.is_authenticated
        elif view.action in ["update", "partial_update", "create"]:
            return user.is_authenticated and (user.role in ["Admin"])
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated