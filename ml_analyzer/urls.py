from django.urls import path
from . import views

urlpatterns = [
    path('ml_predict/', views.ml_predict, name='ml_predict'),
]