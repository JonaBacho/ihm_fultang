from rest_framework.permissions import BasePermission
from rest_framework import permissions


# sera l'equivalent de notre customuserpermission
class MedicalStaffPermission(BasePermission):

    edit_methods = ("POST", "PUT", "PATCH")

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