from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from . import views

urlpatterns = [
    # Esistenti
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('set_assessment/', views.set_assessment),
    path('get_typeAss/', views.get_typeAss),
    path('set_statusIndagine/', views.set_statusIndagine),
    path('get_statusIndagine/', views.get_statusIndagine),
    path('set_preSurvey/', views.set_preSurvey),
    path('get_preSurvey/', views.get_preSurvey),
    path('get_assessmentName/', views.get_assessmentName),
    path('get_surveyLink/', views.get_surveyLink),
    path('set_startTime/', views.set_startTime),
    path('get_all_assessments/', views.get_all_assessments),
    
    # Nuovi endpoint per la gestione della sessione
    path('save_user_data/', views.save_user_data),
    path('update_session_field/', views.update_session_field),
    path('get_user_session/', views.get_user_session),

]


'''
from django.urls import path
from .views import add_user, get_users, set_assessment, set_statusIndagine, set_preSurvey, get_preSurvey, get_typeAss, get_statusIndagine

urlpatterns = [
    path('add_user/', add_user, name="add_user"),
    path('get_users/', get_users, name="get_users"),
    path('set_assessment/', set_assessment, name="set_assessment"),
    path('set_statusIndagine/', set_statusIndagine, name="set_statusIndagine"),
    path('get_statusIndagine/', get_statusIndagine, name="get_statusIndagine"),
    path('set_preSurvey/', set_preSurvey, name="set_preSurvey"),
    path('get_preSurvey/', get_preSurvey, name="get_preSurvey"),
    path('get_typeAss/', get_typeAss, name="get_typeAss"),
]
'''
