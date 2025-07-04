from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import NetworkSerializer, CreateNetSerializer
from .models import Network

# Create your views here.
class NetworkView(generics.CreateAPIView):
    queryset = Network.objects.all()
    serializer_class = NetworkSerializer

class CreateNetView(APIView):
    serializer_class= CreateNetSerializer

    def post(self, request, format=None):
        pass

