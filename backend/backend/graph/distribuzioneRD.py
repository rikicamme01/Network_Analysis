'''import plotly.express as px
from django.http import JsonResponse
from .serializer import convert_ndarray

bg_color = '#002C2C'

def pie_chart_RD(df):
  fig = px.pie(df,
               values= df['Num'],
               names= df['Classe'],
               labels = df['Classe'],
               #color_discrete_sequence=px.colors.sequential.RdBu)
              )
  fig.update_layout(legend=dict(font=dict(size=14,
                                          #family="Arial",
                                          )))

  fig.update_layout(uniformtext_minsize=20, uniformtext_mode='hide')
  fig.update_layout(showlegend=False)
  fig.update_layout(width=500, height=400)
  fig.update_traces(hovertemplate='%{label}: %{value}')
  dict_color = {'Mantenimento':'#E85B55', 'Ibridi':'#F3CB74', 'Generativi': '#5BC69A'}
  fig.update_traces(marker=dict(colors=[dict_color[label] for label in df['Classe']]))

  fig_dict = fig.to_dict()
  serialized_fig = convert_ndarray(fig_dict)
  
  return JsonResponse(serialized_fig)'''
#%%
import plotly.express as px
from django.http import JsonResponse
from .serializer import convert_ndarray
import logging
import json
import pandas as pd

logger = logging.getLogger(__name__)

bg_color = '#002C2C'

def pie_chart_RD(df):
    fig = px.pie(df,
                  values=df['Num'],
                  names=df['Classe'],
                  labels=df['Classe'])

    fig.update_layout(legend=dict(font=dict(size=14)))
    fig.update_layout(uniformtext_minsize=20, uniformtext_mode='hide')
    fig.update_layout(showlegend=True)
    fig.update_layout(width=500, height=400)
    fig.update_traces(hovertemplate='%{label}: %{value}')
      
    dict_color = {'Mantenimento': '#E85B55', 'Ibridi': '#F3CB74', 'Generativi': '#5BC69A'}
    fig.update_traces(marker=dict(colors=[dict_color[label] for label in df['Classe']]))

    # Converti il dizionario del grafico in un formato serializzabile
    fig_dict = fig.to_dict()
    fig_dict_serialized = convert_ndarray(fig_dict)
    
    return fig_dict_serialized
    #return fig
#%%

data = {
    'Classe': ['Mantenimento', 'Ibridi', 'Generativi'],
    'Num': [50, 30, 20]
}

df = pd.DataFrame(data)
pie_chart_RD(df)
# %%
