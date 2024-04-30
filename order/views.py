from rest_framework.views import APIView

from account.models import Customer
from stock.models import Stock
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class OrderAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        if pk:
            print(pk)
            cust=Customer.objects.get(user=request.user)
            data = Order.objects.get(id=pk,cust=cust)
            if data is None:
                return Response({"response":"This Order exist"})
            serializer = OrderSerializer(data)
            return Response(serializer.data)
        else:
            cust=Customer.objects.get(user=request.user)
            if cust!=None:
                data = Order.objects.filter(cust=cust)
                serializer = OrderSerializer(data,many=True)
                return Response(serializer.data)
            else:
                return Response({"response":"You are not a Custumer Till Now!"})                



# class AddDataAPIView(APIView):
#     permission_classes=[IsAuthenticated]
#     def get(self, request, pk=None, format=None):
#         cust=Customer.objects.get(cust=request.user)
#         if cust!=None:
#             product=Stock.objects.get(id=pk)
#             order=Order.objects.create(product=product,cust=cust,address="Lucknow")
#             order.save()
#             return Response({"Message":"Sucess"})
#         else:
#             return Response({"Message":"First Made an Acoount"})