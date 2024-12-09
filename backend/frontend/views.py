from django.shortcuts import render
import requests


# Create your views here.
def index(request, *args, **kwards):
    return render(request, 'frontend/index.html')
