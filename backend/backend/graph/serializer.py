import plotly.graph_objects as go
import plotly.io as pio
import numpy as np
import pandas as pd

def convert_ndarray(obj):
    # Se l'oggetto è un ndarray di NumPy, convertilo in lista
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    # Se l'oggetto è una Serie di Pandas, convertilo in lista
    elif isinstance(obj, pd.Series):
        return obj.tolist()
    # Se l'oggetto è un DataFrame di Pandas, convertilo in dizionario
    elif isinstance(obj, pd.DataFrame):
        return obj.to_dict(orient='records')
    # Se l'oggetto è un dizionario, convertilo ricorsivamente
    elif isinstance(obj, dict):
        return {key: convert_ndarray(value) for key, value in obj.items()}
    # Se l'oggetto è una lista, convertilo ricorsivamente
    elif isinstance(obj, list):
        return [convert_ndarray(item) for item in obj]
    # Converte tipi specifici come np.int64 o np.float64 in tipi nativi Python
    elif isinstance(obj, (np.integer, np.floating)):
        return obj.item()
    # Converte tipi di data/ora in stringhe
    elif isinstance(obj, (pd.Timestamp, np.datetime64)):
        return str(obj)
    # Converte oggetti Plotly Figure in un dizionario serializzabile
    elif isinstance(obj, go.Figure):
        return obj.to_dict()
    # Converte tipi specifici di Plotly in dizionari
    elif hasattr(obj, "to_plotly_json"):
        return obj.to_plotly_json()
    # Altrimenti, restituisci l'oggetto così com'è
    else:
        return obj
