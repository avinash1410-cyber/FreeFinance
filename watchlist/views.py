import re
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from account.models import Customer
from stock.models import Stock
from .models import Watchlist
from .serializers import WatchlistSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class WatchlistAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        if pk:
            cust = Customer.objects.get(user=request.user)
            try:
                data = Watchlist.objects.get(id=pk, cust=cust)
                print("Retrieved Watchlist object:", data)
                serializer = WatchlistSerializer(data)
                return Response(serializer.data)
            except Watchlist.DoesNotExist:
                return Response({"response": "This Watchlist does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
                cust=Customer.objects.get(user=request.user)
                if cust!=None:
                    data = Watchlist.objects.filter(cust=cust)
                    serializer = WatchlistSerializer(data,many=True)
                    return Response(serializer.data)