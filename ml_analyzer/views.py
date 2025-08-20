from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import pandas as pd
import json
from .analyzer import Analyzer 
import torch
import logging
import sys

# Configura logging
logger = logging.getLogger(__name__)

torch.set_num_threads(1)
torch.set_num_interop_threads(1)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ml_predict(request):
    try:
        logger.info("Inizio elaborazione ml_predict")
        
        # Recupera i dati
        df_data = request.data.get('df', None)
        
        if not df_data:
            logger.error("Nessun DataFrame fornito")
            return Response({'error': 'Nessun DataFrame fornito'}, status=400)

        logger.info(f"Tipo di df_data: {type(df_data)}, Lunghezza: {len(df_data) if isinstance(df_data, (list, dict)) else 'N/A'}")
        
        try:
            if isinstance(df_data, (dict, list)):
                df = pd.DataFrame(df_data)
            elif isinstance(df_data, str):
                df = pd.DataFrame(json.loads(df_data))
            else:
                return Response({'error': 'Formato DataFrame non supportato'}, status=400)
                
        except (json.JSONDecodeError, ValueError) as e:
            logger.error(f"Errore nel parsing JSON: {str(e)}")
            return Response({'error': f'Errore nel formato del DataFrame: {str(e)}'}, status=400)

        if df.empty:
            logger.error("DataFrame vuoto")
            return Response({'error': 'Il DataFrame fornito è vuoto'}, status=400)
        
        logger.info(f"DataFrame creato con successo. Shape: {df.shape}")
        
        try:
            analyzer = Analyzer()
            logger.info("Inizio predizione...")
            modified_df = analyzer.predict(df)
            logger.info(f"Predizione completata. Shape risultato: {modified_df.shape if modified_df is not None else 'None'}")
            
        except Exception as e:
            logger.error(f"Errore durante la predizione: {str(e)}")
            return Response({'error': f'Errore durante la predizione: {str(e)}'}, status=500)
            
        if modified_df is None or modified_df.empty:
            logger.error("Nessun dato modificato disponibile")
            return Response({'error': 'Nessun dato modificato disponibile'}, status=500)

        # Converti a dizionario con gestione memoria
        try:
            result = modified_df.to_dict(orient='records')
            logger.info(f"Conversione a dizionario completata. Numero record: {len(result)}")
            
            # Calcola dimensione approssimativa della risposta
            response_size = sys.getsizeof(str(result))
            logger.info(f"Dimensione approssimativa risposta: {response_size} bytes")
            
        except Exception as e:
            logger.error(f"Errore durante la conversione: {str(e)}")
            return Response({'error': f'Errore durante la conversione dati: {str(e)}'}, status=500)

        logger.info("Invio risposta...")
        
        response_data = {
            'message': 'Elaborazione completata',
            'modified_responses_data': result,
            'total_records': len(result)
        }
        
        return Response(response_data, status=200)
    
    except Exception as e:
        logger.error(f"Errore generale durante l'elaborazione: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': f'Errore durante l\'elaborazione: {str(e)}',
            'type': type(e).__name__
        }, status=500)