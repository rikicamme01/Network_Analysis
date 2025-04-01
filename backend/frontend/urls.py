from django.urls import path
from .views import index, add_user, get_all_user

urlpatterns = [
    path('', index),
    path('add/', add_user),
    path('show/', get_all_user),
]