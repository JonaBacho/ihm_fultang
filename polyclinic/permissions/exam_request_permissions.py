from rest_framework import permissions

class ExamRequestPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if view.action in ["destroy"]:
            return user.is_authenticated and user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update", "create"]:
            return user.is_authenticated and (user.role in ["Admin", "Doctor", "Labtech"])
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return user.is_authenticated
        return False