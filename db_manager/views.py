from django.shortcuts import render
from db_manager.db_connection import get_collection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from pymongo.errors import PyMongoError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from bson import ObjectId
from datetime import datetime

################################################## - METODI_SESSIONE_UTENTE - ##################################################################
# Funzione helper per gestire i documenti utente in MongoDB
def get_or_create_user_document(user_id):
    """
    Ottiene o crea un documento utente in MongoDB.
    Restituisce il documento o None in caso di errore.
    """
    try:
        user_collection = get_collection('users')
        user_doc = user_collection.find_one({"user_id": user_id})
        
        if not user_doc:
            # Crea un nuovo documento utente se non esiste
            user_doc = {
                "user_id": user_id,
                "session_data": {},
                "created_at": ObjectId().generation_time
            }
            user_collection.insert_one(user_doc)
            return user_collection.find_one({"user_id": user_id})
        
        return user_doc
    except PyMongoError as e:
        print(f"MongoDB error: {str(e)}")
        return None

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_user_data(request):
    """
    Salva i dati di sessione utente in MongoDB.
    Supporta sia l'aggiornamento completo che l'aggiornamento dei singoli campi.
    """
    user_id = str(request.user.id)
    data = request.data.get("data")
    
    if not data:
        return JsonResponse({"error": "Nessun dato ricevuto"}, status=400)
    
    try:
        # Aggiorna o crea il documento utente
        result = get_collection('users').update_one(
            {"user_id": user_id},
            {"$set": {"session_data": data}},
            upsert=True
        )
        
        return JsonResponse({
            "status": "success", 
            "message": "Dati utente salvati correttamente",
            "updated": result.modified_count > 0,
            "created": result.upserted_id is not None
        })
    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_session_field(request):
    """
    Aggiorna un singolo campo dei dati di sessione utente.
    Utile per aggiornamenti incrementali senza sovrascrivere l'intero documento.
    """
    user_id = str(request.user.id)
    field_name = request.data.get("field")
    field_value = request.data.get("value")
    
    if not field_name:
        return JsonResponse({"error": "Nome del campo mancante"}, status=400)
    
    try:
        # Aggiorna un singolo campo nei dati di sessione
        result = get_collection('users').update_one(
            {"user_id": user_id},
            {"$set": {f"session_data.{field_name}": field_value}},
            upsert=True
        )
        
        return JsonResponse({
            "status": "success", 
            "message": f"Campo '{field_name}' aggiornato correttamente",
            "updated": result.modified_count > 0,
            "created": result.upserted_id is not None
        })
    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_session(request):
    """
    Recupera tutti i dati di sessione dell'utente corrente.
    """
    user_id = str(request.user.id)
    
    try:
        user_doc = get_collection('users').find_one(
            {"user_id": user_id},
            {"session_data": 1, "_id": 0}
        )
        
        if not user_doc or "session_data" not in user_doc:
            return JsonResponse({"session_data": {}}, status=200)
            
        return JsonResponse({"session_data": user_doc["session_data"]}, status=200)
    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

# Le tue funzioni esistenti possono essere integrate con questo nuovo sistema
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_assessment(request):
    if request.method == "POST":
        data = request.data
        assessment = {
            "assessmentName": data.get("assessmentName"),
            "enteName": data.get("enteName"),
            "adminName": data.get("adminName"),
            "adminEmail": data.get("adminEmail"),
            "user_id": str(request.user.id),
            "statusIndagine": 1,
            "typeAss": "org",  #per test si inserisce a mano "net" per pre-survey reti multi-attore
        }

        # Salvataggio nel database MongoDB
        get_collection('assessments').insert_one(assessment)
        
        # Aggiorna anche i dati di sessione utente
        update_session_field_internal(
            str(request.user.id), 
            "current_assessment", 
            {
                "assessmentName": data.get("assessmentName"),
                "statusIndagine": 1
            }
        )
        
        return JsonResponse({"status": "ok", "message": "Dati salvati!"})

    return JsonResponse({"error": "non autorizzato"}, status=403)

# Funzione helper interna
def update_session_field_internal(user_id, field_name, field_value):
    """
    Versione interna di update_session_field per uso nelle altre funzioni API
    """
    try:
        get_collection('users').update_one(
            {"user_id": user_id},
            {"$set": {f"session_data.{field_name}": field_value}},
            upsert=True
        )
        return True
    except:
        return False

##############################################################################################################################


@api_view(['GET'])
def get_typeAss(request):
    if request.method == "GET" and request.user.is_authenticated:
        user_id = str(request.user.id)
        try:
            doc = get_collection('assessments').find_one({"user_id": str(request.user.id)})
            if not doc:
                return JsonResponse({"error": "Pre-survey non trovata per questo utente"}, status=404)
            
            typeAss = doc.get('typeAss')
            return JsonResponse({"typeAss": typeAss}, status=200)

        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)
        
    return JsonResponse({"error": "Non autorizzato"}, status=403) 
 
##############################################################################################################################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_statusIndagine(request):
    if request.method == "POST":
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
            
            # Aggiorna anche lo stato nella sessione utente
            update_session_field_internal(
                str(request.user.id),
                "current_status",
                status
            )

            return JsonResponse({"status": "ok", "message": "Status aggiornato correttamente!"})
        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_statusIndagine(request):
    if request.method == "GET":
        try:
            doc = get_collection('assessments').find_one(
                {"user_id": str(request.user.id)},
                {"statusIndagine": 1, "_id": 0}
            )

            if not doc or "statusIndagine" not in doc:
                return JsonResponse({"error": "statusIndagine non trovato per questo utente"}, status=404)

            return JsonResponse({"statusIndagine": doc["statusIndagine"]}, status=200)

        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)

##############################################################################################################################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_preSurvey(request):
    if request.method == "POST":
        data = request.data

        preSurvey = {}
        fields = [
            "tematica", "organizzazione", "formaGiuridica", "mission",
            "areeInterne", "progettiConclusi", "progettiInCorso",
            "areeCoinvolte", "grandezzaCampione"
        ]

        # Aggiungi solo i campi presenti nel body
        for field in fields:
            value = data.get(field)
            if value is not None:
                preSurvey[field] = value

        # Campi annidati per numeroRuoli
        numero_ruoli_data = data.get("numeroRuoli", {})
        numeroRuoli = {}
        for ruolo in ["gestionale", "decisionale", "operativo"]:
            val = numero_ruoli_data.get(ruolo)
            if val is not None:
                numeroRuoli[ruolo] = val


        if numeroRuoli:
            preSurvey["numeroRuoli"] = numeroRuoli

        if not preSurvey:
            return JsonResponse({"error": "Nessun dato da salvare"}, status=400)

        try:
            get_collection('assessments').update_one(
                {"user_id": str(request.user.id)},
                {"$set": preSurvey}
            )
            
            # Aggiungiamo anche alla sessione utente
            update_session_field_internal(
                str(request.user.id),
                "pre_survey_data",
                preSurvey
            )
            
            return JsonResponse({"status": "ok", "message": "Dati salvati!"})
        except PyMongoError as e:
            return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    return JsonResponse({"error": "Non autorizzato"}, status=403)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_preSurvey(request):
    user_id = str(request.user.id)

    try:
        doc = get_collection('assessments').find_one({"user_id": user_id}) or {}

        # Campi base con default - FIX: gestione corretta degli array vuoti
        response_data = {
            "tematica": doc.get("tematica", ""),
            "organizzazione": doc.get("organizzazione", ""),
            "formaGiuridica": doc.get("formaGiuridica", ""),
            "mission": doc.get("mission", ""),
            "areeInterne": doc.get("areeInterne", [""]) if doc.get("areeInterne") else [""],
            "progettiConclusi": doc.get("progettiConclusi", []),
            "progettiInCorso": doc.get("progettiInCorso", []),
            "areeCoinvolte": doc.get("areeCoinvolte", []),
            "grandezzaCampione": doc.get("grandezzaCampione", 0),
            "numeroRuoli": {
                "gestionale": doc.get("numeroRuoli", {}).get("gestionale", 0),
                "decisionale": doc.get("numeroRuoli", {}).get("decisionale", 0),
                "operativo": doc.get("numeroRuoli", {}).get("operativo", 0)
            }
        }

        return JsonResponse(response_data, status=200)

    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_assessmentName(request):
    user_id = str(request.user.id)

    try:
        doc = get_collection('assessments').find_one({"user_id": user_id})

        if not doc:
            return JsonResponse({"error": "Assessment non trovato per questo utente"}, status=404)

        assessment_name = doc.get("assessmentName")
        if assessment_name is None:
            return JsonResponse({"error": "Campo 'assessmentName' mancante"}, status=500)

        return JsonResponse({"assessmentName": assessment_name}, status=200)

    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

##############################################################################################################################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_surveyLink(request):
    user_id = str(request.user.id)
    
    try:
        collection = get_collection('assessments')
        doc = collection.find_one({"user_id": user_id})

        if not doc:
            return JsonResponse({"error": "Assessment non trovato per questo utente"}, status=404)

        survey_link = doc.get("google_form_url")

        if not survey_link:
            return JsonResponse({"error": "Link del questionario non ancora generato"}, status=400)

        return JsonResponse({"google_form_url": survey_link}, status=200)

    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_startTime(request):
    startTime = request.data.get("startTime")

    if not startTime:
        return JsonResponse({"error": "Il campo 'startTime' è obbligatorio."}, status=400)

    try:
        # Parso la data ISO 8601 e la converto in un formato più gestibile
        parsed_time = datetime.fromisoformat(startTime.rstrip("Z"))
        
        # Se vuoi usare un formato specifico (es. 'dd/MM/yyyy') puoi fare qualcosa del tipo:
        formatted_time = parsed_time.strftime('%d/%m/%Y')  # formato italiano 'dd/MM/yyyy'

    except ValueError:
        return JsonResponse({"error": "Il formato di 'startTime' non è valido. Usa formato ISO 8601."}, status=400)

    try:
        result = get_collection('assessments').update_one(
            {"user_id": str(request.user.id)},
            {"$set": {"startTime": formatted_time}}  # Salviamo il valore formattato
        )

        if result.matched_count == 0:
            return JsonResponse({"error": "Documento non trovato per questo utente."}, status=404)


        update_session_field_internal(
            str(request.user.id),
            "current_status",
            formatted_time
        )

        return JsonResponse({"status": "ok", "message": "Start time aggiornato correttamente."})

    except PyMongoError as e:
        return JsonResponse({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    # Non dovrebbe mai arrivare qui
    return JsonResponse({"error": "Errore sconosciuto."}, status=500)


##############################################################################################################################
STATUS_MAP = {
    0: "Creazione",
    1: "PreSurvey",
    2: "Somministrazione",
    3: "Analizzato",
    4: ""  # o metti la descrizione corretta
}

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_assessments(request):
    try:
        assessments = list(get_collection('assessments').find())
        for i, doc in enumerate(assessments):
            doc['id'] = str(i + 1)
            doc['assessmentName'] = doc.get('assessmentName', '')
            doc['enteName'] = doc.get('enteName', '')
            doc['startTime'] = doc.get('startTime', '')
            status_num = doc.get('statusIndagine', None)
            doc['statusIndagine'] = STATUS_MAP.get(status_num, "Sconosciuto")

            if '_id' in doc:
                doc['_id'] = str(doc['_id'])  # oppure: del doc['_id']

        return JsonResponse(assessments, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)











'''
from django.shortcuts import render
from db_manager.db_connection import get_collection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from pymongo.errors import PyMongoError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_user_data(request):
    user = request.user  # Oggetto User Django autenticato
    user_id = str(user.id)  # o user.username/email se preferisci

    data = request.data.get("data")  # i dati che vuoi salvare per l'utente

    if not data:
        return JsonResponse({"error": "Nessun dato ricevuto"}, status=400)

    # Scrive i dati nel documento Mongo specifico per quell’utente
    get_collection('user').update_one(
        {"_id": user_id},  # chiave primaria Mongo, può essere anche l'email
        {"$set": {"data": data}},  # aggiorna il campo 'data'
        upsert=True  # crea il documento se non esiste
    )

    return JsonResponse({"status": "success"})


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
@permission_classes([IsAuthenticated])
def set_assessment(request):
    if request.method == "POST": #and request.user.is_authenticated:
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
    if request.method == "GET":# and request.user.is_authenticated:
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
    if request.method == "POST":# and request.user.is_authenticated:
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
    if request.method == "GET":# and request.user.is_authenticated:
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
    if request.method == "POST":# and request.user.is_authenticated:
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
    if request.method == "GET":# and request.user.is_authenticated:
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
'''