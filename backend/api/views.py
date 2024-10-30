from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import NetworkSerializer
from .models import Network

# Create your views here.
class NetworkView(generics.CreateAPIView):
    queryset = Network.object.all()
    serializer_class = NetworkSerializer