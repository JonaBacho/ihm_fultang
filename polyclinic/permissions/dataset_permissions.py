from rest_framework.permissions import BasePermission

class IsDatasetAPIUser(BasePermission):
    """
    Permet l'accès uniquement si l'utilisateur est le 'dataset_api_user'
    authentifié via DatasetTokenAuthentication.
    """
    def has_permission(self, request, view):
        # L'utilisateur doit être le dataset_api_user et être authentifié
        return request.user.is_authenticated and request.user.username == 'dataset_api_user'