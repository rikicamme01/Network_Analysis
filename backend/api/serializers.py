from rest_framework import serializers
from .models import Network


class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields=('id', 'code', 'admin', 'created_at')

class CreateNetSerializer(serializers.ModelSerializer):
    class Meta:
        model: Network
        fields=('admin')