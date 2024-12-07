from pymongo import MongoClient
from django.http import JsonResponse
from graph import pie_chart_RD 

client =MongoClient('connection_string')
db = client['db_name']

#chiamata alla funzione preparazioneDataframe


def get_pie_chart_RD(request):
    plot_data = pie_chart_RD()
    return JsonResponse({'plot': plot_data})