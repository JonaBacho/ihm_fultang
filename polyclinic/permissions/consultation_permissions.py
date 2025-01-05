from rest_framework import permissions

class ConsultationPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ["destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["list", "retrieve", "update", "partial_update"]:
            return request.user.is_authenticated and (request.user.role in ["Admin", "Receptionist", "Nurse", "Doctor"])
        elif view.action == "create":
            return request.user.is_authenticated and request.user.role in ["Admin", "Nurse", "Receptionist"]
        elif request.method in ["GET", "POST", "PUT", "PATCH"]:
            return request.user.is_authenticated
        return False