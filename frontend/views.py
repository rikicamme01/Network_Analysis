from django.shortcuts import render
from django.http import HttpResponse
import requests
from db_manager.db_connection import get_collection
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests


def index(request, *args, **kwards):
    return render(request, 'frontend/index.html')

# Endpoint WordPress JWT
WP_LOGIN_URL = "https://tuo-sito.it/wp-json/jwt-auth/v1/token"

@csrf_exempt
def wordpress_login(request):
    """
    Riceve username+password dal frontend React
    e li passa a WordPress per ottenere il JWT token.
    """
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode("utf-8"))
            username = body.get("username")
            password = body.get("password")

            res = requests.post(WP_LOGIN_URL, data={
                "username": username,
                "password": password
            })

            if res.status_code == 200:
                data = res.json()
                # Restituiamo il token WP al frontend
                return JsonResponse({
                    "status": "ok",
                    "token": data.get("token"),
                    "user": {
                        "email": data.get("user_email"),
                        "name": data.get("user_display_name")
                    }
                })
            else:
                return JsonResponse({
                    "status": "error",
                    "details": res.json()
                }, status=401)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)