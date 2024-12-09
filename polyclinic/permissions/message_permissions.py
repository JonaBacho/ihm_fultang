from rest_framework.permissions import BasePermission


class MessagePermission(BasePermission):

    def has_permission(self, request, view):
        if view.action in ["destroy"]:
            return request.user.is_authenticated and request.user.role == "Admin"
        elif view.action in ["list", "create", "retrieve", "update", "partial_update"]:
            return request.user.is_authenticated and (request.user.role == "Admin" or request.user.role == "Receptionist")
        return False

    def has_object_permission(self, request, view, obj):
        # Autoriser un utilisateur avec le rôle 'Admin' pour toutes les actions
        if request.user.role == "Admin":
            return True
        elif request.user.role == "Receptionist" and view.action != "destroy":
            return True
        # Autoriser un utilisateur à accéder uniquement à ses propres messages
        elif view.action in ["retrieve", "update", "partial_update"]:
            return obj.idMedicalStaff == request.user
        return False