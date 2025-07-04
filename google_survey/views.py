from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from pymongo.errors import PyMongoError
from db_manager.db_connection import get_collection
from .form_builders import net_form_builder, org_form_builder
from .google_form import GoogleForm
import os
from django.conf import settings

import traceback

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_google_net_survey(request):
    user_id = str(request.user.id)

    try:
        collection = get_collection('assessments')
        doc = collection.find_one({"user_id": user_id}) or {}

        #print("Documento MongoDB:", doc)    

        responses = {
            
        }

        form = net_form_builder(responses)
        form_url = form.uri

        # Salva l’URL nel documento Mongo
        collection.update_one(
            {"user_id": user_id},
            {"$set": {"google_form_url": form_url}},
            upsert=True  # crea il documento se non esiste
        )

        return Response({"form_url": form_url})

    except PyMongoError as e:
        return Response({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    except Exception as e:
        print("ERRORE SERVER:")
        #traceback.print_exc()
        return Response({"error": f"{type(e).__name__}: {str(e)}"}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_google_org_survey(request):
    user_id = str(request.user.id)

    try:
        collection = get_collection('assessments')
        doc = collection.find_one({"user_id": user_id}) or {}

        #print("Documento MongoDB:", doc)    

        responses = {
            "assessmentName":doc.get("assessmentName", ""),
            "enteName":doc.get("enteName"),
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

        form = org_form_builder(responses)
        form_url = form.uri
        form_id = form.form_id

        # Salva l’URL nel documento Mongo
        collection.update_one(
            {"user_id": user_id},
            {"$set": {
                "google_form_url": form_url,
                "google_form_id": form_id
            }},
            upsert=True
        )

        return Response({"form_url": form_url})

    except PyMongoError as e:
        return Response({"error": f"Errore MongoDB: {str(e)}"}, status=500)

    except Exception as e:
        print("ERRORE SERVER:")
        #traceback.print_exc()
        return Response({"error": f"{type(e).__name__}: {str(e)}"}, status=500)

'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_google_org_survey(request):{}
'''

from bson import ObjectId
from bson import ObjectId
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .google_form import GoogleForm  # Assicurati di importare correttamente GoogleForm

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_google_form_responses(request): 
    print(f"User: {request.user}")
    print(f"Is authenticated: {request.user.is_authenticated}")   

    # Ottieni l'ID dell'assessment dalla query string
    assessment_id = request.query_params.get('assessment_id')
    print(f"Assessment ID: {assessment_id}")

    if not assessment_id:
        return Response({"error": "ID dell'assessment mancante."}, status=400)

    try:
        # Converti l'ID in ObjectId
        try:
            assessment_id = ObjectId(assessment_id)
        except Exception as e:
            return Response({"error": "ID dell'assessment non valido."}, status=400)

        # Ottieni il documento dell'assessment dalla collection
        collection = get_collection('assessments')
        doc = collection.find_one({"_id": assessment_id})

        # Verifica che il documento esista e contenga il campo google_form_id
        if not doc or "google_form_id" not in doc:
            return Response({"error": "ID del modulo Google non trovato per questo assessment."}, status=404)

        # Recupera l'ID del modulo Google e aggiorna la mappatura delle domande
        form_id = doc["google_form_id"]
        form = GoogleForm.from_form_id(form_id)
        form.update_question_map()

        # Ottieni i DataFrame
        responses_df, formatted_responses_df = form.export_responses()

        if responses_df is None or formatted_responses_df is None:
            return Response({"error": "Errore durante l'esportazione dei dati. Nessuna risposta trovata."}, status=500)

        # Restituisci i dati come JSON
        return Response({
            "message": "Esportazione completata.",
            "responses_data": responses_df.to_dict(orient="records"),
            "formatted_responses_data": formatted_responses_df.to_dict(orient="records")
        })

    except Exception as e:
        # Log dell'errore per il debugging
        print(f"Errore durante l'esportazione: {type(e).__name__}: {str(e)}")
        return Response({"error": f"Errore durante l'esportazione: {str(e)}"}, status=500)


'''
#%%
from .google_form import GoogleForm
form_id='1DFAdTCPs_lpltArPO7IItpQ1ktd-KuvvBtingnbfnQ4'
form = GoogleForm.from_form_id(form_id)
form.update_question_map()
output_dir = os.path.join(settings.BASE_DIR, "exports")
os.makedirs(output_dir, exist_ok=True)
csv_path, xlsx_path = form.export_responses(output_dir=output_dir)

# %%
'''