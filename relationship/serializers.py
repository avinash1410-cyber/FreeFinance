from rest_framework import serializers
from .models import RelationShip
from trader.serializers import TraderSerializer
from account.serializers import CustomerSerializer
from order.serializers import OrderSerializer


class RelationShipSerializer(serializers.ModelSerializer):
    trader = TraderSerializer()
    cust = CustomerSerializer()
    orders = OrderSerializer(many=True, read_only=True)
    class Meta:
        model=RelationShip
        fields='__all__'