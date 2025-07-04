from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import pandas as pd
import json
from .analyzer import Analyzer 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ml_predict(request):
    try:
        # Log per vedere i dati che arrivano
        #print("Dati ricevuti:", request.data)
        print("Tipo di dati:", type(request.data))
        
        # Recupera i dati passati tramite i parametri della query (df)
        df_data = request.data.get('df', None)
        
        # Verifica se sono stati forniti dati
        if not df_data:
            return Response({'error': 'Nessun DataFrame fornito'}, status=400)

        # Log per vedere il tipo di df_data
        print("Tipo di df_data:", type(df_data))
        #print("Contenuto df_data:", df_data)

        try:
            # Se df_data è già un dict/list, non fare json.loads
            if isinstance(df_data, (dict, list)):
                df = pd.DataFrame(df_data)
            elif isinstance(df_data, str):
                # Solo se è una stringa, fai json.loads
                df = pd.DataFrame(json.loads(df_data))
            else:
                return Response({'error': 'Formato DataFrame non supportato'}, status=400)
                
        except (json.JSONDecodeError, ValueError) as e:
            print("Errore nel parsing JSON:", str(e))
            return Response({'error': f'Errore nel formato del DataFrame: {str(e)}'}, status=400)

        # Verifica se i dati sono effettivamente un DataFrame valido
        if df.empty:
            return Response({'error': 'Il DataFrame fornito è vuoto'}, status=400)
        
        print("DataFrame creato:", df.head())  # Log per vedere come viene creato il DataFrame
        print("Colonne del DataFrame:", df.columns.tolist())  # Log per vedere le colonne
        
        analyzer = Analyzer()

        modified_df = analyzer.predict(df)
        
        if modified_df is None or modified_df.empty:
            return Response({'error': 'Nessun dato modificato disponibile'}, status=500)

        result = modified_df.to_dict(orient='records')

        return Response({
            'message': 'Elaborazione completata',
            'modified_responses_data': result
        })
    
    except Exception as e:
        # Log per vedere l'errore esatto
        print("Errore durante l'elaborazione:", str(e))
        import traceback
        traceback.print_exc()  # Stampa il traceback completo
        return Response({'error': f'Errore durante l\'elaborazione: {str(e)}'}, status=500)