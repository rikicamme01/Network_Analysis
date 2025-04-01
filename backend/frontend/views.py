from django.shortcuts import render
from django.http import HttpResponse
import requests
from db_manager.db_connection import get_collection


# Create your views here.
def index(request, *args, **kwards):
    return render(request, 'frontend/index.html')