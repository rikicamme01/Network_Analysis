from django.shortcuts import render
from db_manager.db_connection import get_collection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from pymongo.errors import PyMongoError

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

########################################################################################################################################################

@api_view(['POST'])
def set_assessment(request):
    if request.method == "POST" and request.user.is_authenticated:
        data = request.data
        assessment = {
            "assessmentName": data.get("assessmentName"),
            "enteName": data.get("enteName"),
            "adminName": data.get("adminName"),
            "adminEmail": data.get("adminEmail"),
            "user_id": request.user.id,  # Associamo l'assessment all'utente loggato
            "statusIndagine":0,
            "typeAss": "org",
        }

        # Salvataggio nel database MongoDB
        get_collection('assessments').insert_one(assessment)
        return JsonResponse({"status": "ok", "message": "Dati salvati!"})

    return JsonResponse({"error": "non autorizzato"}, status=403)

########################################################################################################################################################

@api_view(['GET'])
def get_typeAss(request):
    if request.method == "GET" and request.user.is_authenticated:
        user_id = str(request.user.id)
        try:
            doc = get_collection('assessments').find_one({"user_id": user_id})
            if not doc:
                return JsonResponse({"error": "Pre-survey non trovata per questo utente"}, status=404)
            
            typeAss = doc.get('typeAss')
            return JsonResponse({"typeAss": typeAss}, status=200)

        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)
        
    return JsonResponse({"error": "Non autorizzato"}, status=403)  

########################################################################################################################################################

@api_view(['POST'])
def set_statusIndagine(request):
    if request.method == "POST" and request.user.is_authenticated:
        status = request.data.get("statusIndagine")

        # Verifica che sia un numero valido (tra 0 e 4)
        if status is None or not isinstance(status, int) or status not in [0, 1, 2, 3, 4]:
            return JsonResponse({"error": "Valore di statusIndagine non valido"}, status=400)

        try:
            result = get_collection('assessments').update_one(
                {"user_id": str(request.user.id)},
                {"$set": {"statusIndagine": status}}
            )

            if result.matched_count == 0:
                return JsonResponse({"error": "Documento non trovato per questo utente"}, status=404)

            return JsonResponse({"status": "ok", "message": "Status aggiornato correttamente!"})
        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)

@api_view(['GET'])
def get_statusIndagine(request):
    if request.method == "GET" and request.user.is_authenticated:
        try:
            doc = get_collection('assessments').find_one(
                {"user_id": str(request.user.id)},
                {"statusIndagine": 1, "_id": 0}  # Proietta solo il campo desiderato
            )

            if not doc or "statusIndagine" not in doc:
                return JsonResponse({"error": "statusIndagine non trovato per questo utente"}, status=404)

            return JsonResponse({"statusIndagine": doc["statusIndagine"]}, status=200)

        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)

########################################################################################################################################################

@api_view(['POST'])
def set_preSurvey(request):
    if request.method == "POST" and request.user.is_authenticated:
        data = request.data

        preSurvey = {}
        fields = [
            "tematica", "organizzazione", "formaGiuridica", "mission",
            "areeInterna", "progettiConclusi", "progettiInCorso",
            "areeCoinvolte", "grandezzaCampione"
        ]

        # Aggiungi solo i campi presenti nel body
        for field in fields:
            value = data.get(field)
            if value is not None:
                preSurvey[field] = value

        # Campi annidati per numeroRuoli
        numeroRuoli = {}
        for ruolo in ["gestionale", "decisionale", "operativo"]:
            val = data.get(ruolo)
            if val is not None:
                numeroRuoli[ruolo] = val

        if numeroRuoli:
            preSurvey["numeroRuoli"] = numeroRuoli

        if not preSurvey:
            return JsonResponse({"error": "Nessun dato da salvare"}, status=400)

        try:
            get_collection('assessments').update_one(
                {"user_id": str(request.user.id)},       # Filtro
                {"$set": preSurvey}     # Solo aggiornamento
            )
            return JsonResponse({"status": "ok", "message": "Dati salvati!"})
        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)


@api_view(['GET'])
def get_preSurvey(request):
    if request.method == "GET" and request.user.is_authenticated:
        user_id = str(request.user.id)

        try:
            doc = get_collection('assessments').find_one({"user_id": user_id})

            if not doc:
                return JsonResponse({"error": "Pre-survey non trovata per questo utente"}, status=404)

            # Costruisci il dizionario da restituire
            response_data = {}

            # Campi semplici
            for field in [
                "tematica", "organizzazione", "formaGiuridica", "mission",
                "areeInterna", "progettiConclusi", "progettiInCorso",
                "areeCoinvolte", "grandezzaCampione"
            ]:
                val = doc.get(field)
                if val is not None:
                    response_data[field] = val

            # Campi annidati: numeroRuoli
            numero_ruoli = doc.get("numeroRuoli", {})
            for ruolo in ["gestionale", "decisionale", "operativo"]:
                valore = numero_ruoli.get(ruolo)
                if valore is not None:
                    response_data[ruolo] = valore

            return JsonResponse(response_data, status=200)

        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)
########################################################################################################################################################