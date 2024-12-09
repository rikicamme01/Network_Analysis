from pymongo import MongoClient
from django.http import JsonResponse
from graph.distribuzioneRD import pie_chart_RD 

client =MongoClient('connection_string')
db = client['db_name']
