from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """Custom permission to allow only owner to edit their snippets"""

    def has_object_permission(self, request, view, obj):

        # Allow GET, HEAD or OPTIONS request
        if request.method in SAFE_METHODS:
            return True

        # Allow write permissions to the owner
        return obj.owner == request.user
