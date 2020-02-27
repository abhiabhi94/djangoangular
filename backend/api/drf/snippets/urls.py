from django.urls import path, include
from rest_framework.routers import DefaultRouter
from snippets import views

# Create an API and register viewsets with it
route = DefaultRouter()
route.register(r'snippets', views.SnippetViewSet)
route.register(r'users', views.UserViewSet)

# API urls are now determined automatically by the router
urlpatterns = [
    path('', include(route.urls))
]
