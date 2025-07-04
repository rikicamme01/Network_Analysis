# google_integration/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('generate_google_net_survey/', views.generate_google_net_survey, name='generate_google_net_survey'),
    path('generate_google_org_survey/', views.generate_google_org_survey, name='generate_google_org_survey'),
    path('export_google_form_responses/', views.export_google_form_responses, name='export_google_form_responses'),
]