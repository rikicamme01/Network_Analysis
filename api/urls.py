from django.urls import path, include
from .views import NetworkView


urlpatterns = [
    path('home', NetworkView.as_view()),
]