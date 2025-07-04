from pymongo import MongoClient
from django.http import JsonResponse
from .graph.distribuzioneRD import pie_chart_RD 
from .graph.preparazioneDataset import prepareDf
from .graph.serializer import convert_ndarray


def get_pie_chart_RD(request):
    try:
        dataframe = prepareDf()
        data = pie_chart_RD(dataframe)
        # Applica la conversione ai dati prima di passarli a JsonResponse
        #data_dict = data.to_dict()
        #data_serialized = convert_ndarray(data)
        return JsonResponse({'data': data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

