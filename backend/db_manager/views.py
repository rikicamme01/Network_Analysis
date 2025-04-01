from django.shortcuts import render
from db_manager.db_connection import get_collection
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Aggiungere un nuovo utente
@api_view(['POST'])
def add_user(request):
    # Estrai email e password dalla richiesta
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required!"}, status=400)

    # Crea un nuovo record utente
    records = {
        "email": email,
        "password": password,
    }

    # Inserisci il record nel database MongoDB
    try:
        get_collection('user').insert_one(records)
        return JsonResponse({"message": "New user is added"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# Ottieni tutti gli utenti
@api_view(['GET'])
def get_users(request):
    try:
        users = list(get_collection('user').find())
        return JsonResponse({"users": users}, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
