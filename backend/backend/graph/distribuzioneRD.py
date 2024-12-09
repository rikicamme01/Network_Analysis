import plotly.express as px
import plotly
import json
from .distribuzioneRD import prepareDf   

bg_color = '#002C2C'
df=prepareDf()      #forse ha senso chiamarla direttamente in react

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
  fig.update_layout(width=700, height=500)
  fig.update_traces(hovertemplate='%{label}: %{value}')
  dict_color = {'Mantenimento':'#E85B55', 'Ibridi':'#F3CB74', 'Generativi': '#5BC69A'}
  fig.update_traces(marker=dict(colors=[dict_color[label] for label in df['Classe']]))
  
  return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)