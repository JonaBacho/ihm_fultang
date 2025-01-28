from rest_framework import permissions

from authentication.user_helper import fultang_user


class ExamPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        user, _ = fultang_user(request)
        return user.is_authenticated and user.role == "Admin"