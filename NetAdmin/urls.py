from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.netAdmin),
    path('signUp/', views.singUp , name='signUp'),
    path('logIn/', views.logIn, name = 'logIn'),
]