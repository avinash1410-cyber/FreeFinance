from rest_framework import serializers
from .models import RelationShip
from trader.serializers import TraderSerializer
from account.serializers import CustomerSerializer



class RelationShipSerializer(serializers.ModelSerializer):
    trader = TraderSerializer()
    cust = CustomerSerializer()
    class Meta:
        model=RelationShip
        fields='__all__'