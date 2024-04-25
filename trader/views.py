from rest_framework.views import APIView
import json
from account.models import Customer
from design.models import Design
from design.serializers import DesignSerilaizer
from .models import Trader
from .serializers import TraderSerializer,TraderClientSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from account.serializers import CustomerSerializer
from rest_framework import status
from relationship.models import RelationShip
from relationship.serializers import RelationShipSerializer
from stock.models import Stock
from order.models import Order
from order.serializers import OrderSerializer




class TraderClientAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            print(pk)
            try:
                cust = Customer.objects.get(user=request.user)
                trader = Trader.objects.get(cust=cust)
                client = Customer.objects.get(id=pk)
                print(cust)
                print(client)
                print(trader)
                print("________________________________________________________________________________")
                rel = RelationShip.objects.get(trader=trader, cust=client)
                serializer = RelationShipSerializer(rel)
                print(serializer.data)
                return Response(serializer.data)
            except Trader.DoesNotExist:
                return Response({"Message": "No Trader Found for this user"}, status=status.HTTP_404_NOT_FOUND)
            except RelationShip.DoesNotExist:
                return Response({"Message": "No Relationship found between trader and client"}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = Trader.objects.all()
            serializer = TraderSerializer(data, many=True)
            return Response(serializer.data)



class TraderProfileAPIView(APIView):
    def get(self, request, pk=None, format=None):
        if pk:
            try:
                data = Trader.objects.get(id=pk)
                serializer = TraderSerializer(data)
            except Trader.DoesNotExist:
                return Response({"Message":"No Any Trader Found from this id"},status=status.HTTP_404_NOT_FOUND)
        else:
            data = Trader.objects.all()
            serializer = TraderSerializer(data,many=True)
        return Response(serializer.data)



class MyTraderProfileAPIView(APIView):
    def get(self, request):
        try:
            cust = Customer.objects.get(user=request.user)
            trader_instance = Trader.objects.get(cust=cust)
            serializer = TraderSerializer(instance=trader_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Trader.DoesNotExist:
            return Response({"Message": "No Trader Found for this user"}, status=status.HTTP_404_NOT_FOUND)




class My_Clients_TraderAPIView(APIView):
    def get(self, request):
        cust=Customer.objects.get(user=request.user)
        data = Trader.objects.get(cust=cust)
        serializer = TraderSerializer(data)
        data = serializer.data
        clients_value = data["clients"]
        print(clients_value)
        data = []

        for c in clients_value:
            cust = Customer.objects.get(id=int(c))
            serializer = CustomerSerializer(cust)
            # Serialize the data and append it to the list
            serialized_data = serializer.data
            data.append(serialized_data)
        return Response(data,status=status.HTTP_200_OK)









        

from django.db.models import Q

class TraderClientBuyAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk=None):
        if pk:
            client=Customer.objects.get(id=pk)
            cust=Customer.objects.get(user=request.user)
            trader=Trader.objects.get(cust=cust)
            stock_id=request.data["stock_id"]
            amount=int(request.data["amount"])
            quantity=0
            stock=Stock.objects.get(id=stock_id)
            if int(amount)<stock.price:
                message=f'Your amount is so much low please send at least Rs.{stock.price}.'
                return Response({'message': message}, status=status.HTTP_200_OK)
            quantity=amount//int(stock.price)
            try:
                order = Order.objects.get(cust=cust, stock=stock,buy=trader)
                order.quantity += int(quantity)
                
                order.amount += int(amount)  # Incrementing the amount
                order.save()
            except Order.DoesNotExist:
                order = Order.objects.create(
                    quantity=quantity,
                    amount=amount,
                    cust=client,
                    stock=stock,
                    buy=trader,
                )
            order.quantity += int(quantity)
            previous_balance = order.amount
            previous_balance = int(previous_balance) if previous_balance else 0
            order.amount = previous_balance+int(amount)  # Incrementing the amount
            order.save()
            rel=RelationShip.objects.get(cust=client,trader=trader)
            rel.orders.add(order)
            previous_balance = rel.invested
            previous_balance = int(previous_balance) if previous_balance else 0

            rel.invested=previous_balance-int(amount)
            rel.save()
            return Response({'message': f'Congrats u have Bought the {quantity} no stock of {stock} on behalf of {client}'}, status=status.HTTP_200_OK)        
        

class TraderClientOrderAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,pk=None):
        if pk:
            client=Customer.objects.get(id=pk)
            cust=Customer.objects.get(user=request.user)
            trader=Trader.objects.get(cust=cust)
            rel=RelationShip.objects.get(cust=client,trader=trader)
            order = rel.orders.all()
            serializer=OrderSerializer(order,many=True)
            return Response({'message':serializer.data}, status=status.HTTP_200_OK)        




class TraderClientSellAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk=None):
        if pk:
            client=Customer.objects.get(id=pk)
            cust=Customer.objects.get(user=request.user)
            trader=Trader.objects.get(cust=cust)
            order_id=request.data["order_id"]
            quantity=int(request.data["quantity"])
            try:
                order=Order.objects.get(id=order_id)
                order.cust=client
                order.buy=trader
            except Order.DoesNotExist:
                order = None
                return Response({"Message":"Order Not Exist"},status=status.HTTP_200_OK)
            quantity_have=int(order.quantity)
            if quantity_have<=0:
                return Response({'message':f"You can't sell as u have {quantity_have} no of stocks please buy first"}, status=status.HTTP_200_OK)
            if quantity_have-quantity<0:
                return Response({'message':f"You can't sell as u have {quantity_have} no of stocks please buy first and u are trying to sell {quantity} no of stocks please decrease the quantity u want to sell"}, status=status.HTTP_200_OK)
            new_quantity=int(quantity_have-quantity)
            if new_quantity==0:
                money=order.stock.price*quantity
                order.delete()
            else:
                order.quantity=new_quantity
                money=order.stock.price*quantity
                order.save()
            company=order.stock.name
            rel=RelationShip.objects.get(cust=client,trader=trader)
            previous_balance = rel.invested
            previous_balance = int(previous_balance) if previous_balance else 0
            client_prev_balance=client.balance
            client_prev_balance=int(client_prev_balance) if client_prev_balance else 0
            rel.invested=previous_balance-int(money)
            rel.save()
            client.balance=client_prev_balance+int(money)
            client.save()        
            data=f"Congratulations u have sell {quantity} no of stock of {company} stocks on behalf of {client}!!!"
            return Response({'message': data}, status=status.HTTP_200_OK)
        return Response({"message":"Request Not allowed"}, status.HTTP_400_BAD_REQUEST)





# class TraderOptions(APIView):
#     # permission_classes=[IsAuthenticated]
#     def get(self,request,pk=None):
#         if pk==None:
#             cust=Customer.objects.get(user=request.user)
#             artist=Trader.objects.get(cust=cust)
#         else:
#             artist=Trader.objects.get(id=pk)
#         design=Design.objects.filter(artist=artist)
#         srlzr=DesignSerilaizer(design,many=True)
#         return Response(srlzr.data)





# class AddDataAPIView(APIView):
#     permission_classes=[IsAuthenticated]
#     def post(self,request):
#         design=request.data['design']
#         img=request.data['image']
#         cust=Customer.objects.get(user=request.user)
#         artist=Artist.objects.get(cust=cust)
#         if artist!=None:
#             design=Design.objects.create(design=design,image=img,artist=artist)
#             design.save()
#             return Response({"Message":"Done"})
#         else:
#             return Response({"Message":"Be an artist first"})
#     def get(self,request):
#         return Response({"design":"","image":""})