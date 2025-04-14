from django.urls import path
from .views import get_users, set_assessment, set_statusIndagine, set_preSurvey, get_preSurvey, get_typeAss, get_statusIndagine

urlpatterns = [
    #path('add_user/', add_user, name="add_user"),
    path('get_users/', get_users, name="get_users"),
    path('set_assessment/', set_assessment, name="set_assessment"),
    path('set_statusIndagine/', set_statusIndagine, name="set_statusIndagine"),
    path('get_statusIndagine/', get_statusIndagine, name="get_statusIndagine"),
    path('set_preSurvey/', set_preSurvey, name="set_preSurvey"),
    path('get_preSurvey/', get_preSurvey, name="get_preSurvey"),
    path('get_typeAss/', get_typeAss, name="get_typeAss"),
]
