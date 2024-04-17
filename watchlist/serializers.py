from rest_framework import serializers
from .models import Watchlist
from stock.serializers import StockSerializer

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ['id', 'name', 'stock', 'cust']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['stock'] = StockSerializer(instance.stock.all(), many=True).data
        return representation
