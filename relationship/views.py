from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from account.models import Customer
from trader.models import Trader
from .models import RelationShip
from .serializers import RelationShipSerializer




@api_view(['POST',])
@permission_classes([IsAuthenticated])
def invest(request):
    if request.method == 'POST':
        try:
            trader_id = request.data.get("trader_id")
            amount = int(request.data.get("amount", 0))
            if not trader_id or amount <= 0:
                return Response({'response': "Invalid data provided"}, status=status.HTTP_400_BAD_REQUEST)
            
            cust = Customer.objects.get(user=request.user)
            trader = Trader.objects.get(id=trader_id)
            clients = list(trader.clients.all().values_list('id', flat=True))
            if cust.id in clients:
                rel, created = RelationShip.objects.get_or_create(trader=trader, cust=cust)
                previous_balance = rel.invested
                new_balance = amount + previous_balance if previous_balance else amount
                rel.invested = new_balance
                rel.save()
                return Response({'response': "Investment successful", 'new_balance': new_balance}, status=status.HTTP_200_OK)
            else:
                return Response({'response': "You have to hire this trader first"}, status=status.HTTP_400_BAD_REQUEST)
        except Customer.DoesNotExist:
            return Response({'response': "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Trader.DoesNotExist:
            return Response({'response': "Trader not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'response': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
