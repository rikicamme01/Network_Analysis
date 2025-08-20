from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/wp_login/", views.wordpress_login, name="wp_login"),
]
