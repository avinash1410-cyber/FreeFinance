from rest_framework import generics
# Create your views here.
from rest_framework.views import APIView
from rest_framework import status

from trader.models import Trader
from trader.serializers import TraderSerializer
from .models import Customer

from relationship.models import RelationShip
from stock.models import Stock
from stock.serializers import StockSerializer
from order.models import Order
from order.serializers import OrderSerializer


from watchlist.models import Watchlist
from watchlist.serializers import WatchlistSerializer


from django.shortcuts import get_object_or_404
from .serializers import ChangePasswordSerializer, CustomerSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated







from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status







@api_view(('GET','POST'))
def register_page(request):
    if request.method == "POST":
        userName = request.data['username']
        userPass = request.data['password']
        userMail = request.data['email']
        phone=request.data['phone']
        address=request.data['add']
        userBalance = 0
        user = User.objects.create_user(userName, userMail, userPass)
        cust=Customer.objects.create(
            user=user,
            add=address,
            phone=phone,
            balance=userBalance
        )
        return Response({"message":"Registration done"})
    return Response({"username":"","password":"","email":"","phone":"","add":""})


@api_view(('GET','POST'))
def login_page(request):
    print("IN LOGIN")
    if request.method == "POST":
        username = request.data['username']
        password=request.data['password']
        print(request.user)
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            print(request.user)
            return Response({"message":"Login done"})
        else:
            return Response({"message":"Invalid Credentials"})
    return Response({"username":"","password":""})



@api_view(('GET',))
def logout_page(request):
    logout(request)
    return Response({'message':"Logged out"})




class update_trader(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        cust = get_object_or_404(Customer, user=request.user)
        trader_exists = Trader.objects.filter(cust=cust).exists()        
        if not trader_exists:
            Trader.objects.create(cust=cust, Trader=True)
            return Response({'message': 'Trader Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'You are already a Trader'}, status=status.HTTP_200_OK)


class CustomerAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk=None, format=None):
        data = Customer.objects.get(user=request.user)
        serializer = CustomerSerializer(data)
        return Response(serializer.data)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer()
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulations, your API just responded to the POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addBalance(request):
    amount = request.data.get('amount')
    if not amount:
        return Response({'response': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

    cust = Customer.objects.get(user=request.user)
    previous_balance = cust.balance
    previous_balance = int(previous_balance) if previous_balance else 0
    print("Previous Balance")
    print(previous_balance)
    new_balance = int(amount) + previous_balance
    cust.balance = new_balance
    cust.save()
    data = f'Congratulations, your new balance is: {new_balance}'
    return Response({'response': data}, status=status.HTTP_200_OK)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def withdrawBalance(request):
    amount = request.data.get('amount')
    if not amount:
        return Response({'response': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)
    cust=Customer.objects.get(user=request.user)
    previous_balance=cust.balance
    previous_balance = int(previous_balance) if previous_balance else 0
    new_balance=previous_balance-int(amount)
    if new_balance<0:
        data = f'Sorry, you can not withdraw more than {previous_balance}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    cust.balance=new_balance
    cust.save()
    data = f'Congratulations, your new balance is: {new_balance}'
    return Response({'response': data}, status=status.HTTP_200_OK)


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def buyStock(request,pk=None):
    if request.method == 'POST':
        stock_id=request.data["stock_id"]
        amount=int(request.data["amount"])
        quantity=0

        cust=Customer.objects.get(user=request.user)
        trader=Trader.objects.get(cust=cust)
        stock=Stock.objects.get(id=stock_id)
        if int(amount)<stock.price:
            message=f'Your amount is so much low please send at least Rs.{stock.price}.'
            return Response({'message': message}, status=status.HTTP_200_OK)
        quantity=amount//int(stock.price)
        try:
            order = Order.objects.get(cust=cust, stock=stock)
            order.quantity += int(quantity)
            order.amount += int(amount)  # Incrementing the amount
            order.save()
        except Order.DoesNotExist:
            order = Order.objects.create(
                quantity=quantity,
                amount=amount,
                cust=cust,
                stock=stock,
                trader=trader,
            )
        # data = f'Congratulation you have bought {quantity} no of stocks of {stock.name}'
        data="Successful"
        return Response({'message': data}, status=status.HTTP_200_OK)
    # elif request.method == 'GET':
    #     return Response({'amount':'','stock_id':''}, status=status.HTTP_200_OK)
    return Response({"message":"Request Not allowed"}, status.HTTP_400_BAD_REQUEST)



@api_view(['POST',])
@permission_classes([IsAuthenticated])
def sellStock(request,pk=None,id=None):
    # if request.method == 'GET':
    #     return Response({'quantity':'','stock_id':''}, status=status.HTTP_200_OK)
    if request.method == 'POST':
        quantity=int(request.data["quantity"])
        stock_id=request.data["stock_id"]
        cust=Customer.objects.get(user=request.user)
        stock=Stock.objects.get(id=stock_id)
        try:
            order=Order.objects.get(cust=cust,stock_id=stock)
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
            order.delete()
        else:
            order.quantity=new_quantity
            order.save()
        company=stock.name
        # text=f"Congratulations u have sell {quantity} no of stock of {company} stocks !!!"
        data="Successful"
        return Response({'message': data}, status=status.HTTP_200_OK)
    return Response({"message":"Request Not allowed"}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buyOption(request):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def sellOption(request):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def hireTrader(request,pk=None):
    if pk:
        try:
            trader=Trader.objects.get(id=pk)
            cust=Customer.objects.get(user=request.user)
            trader.clients.add(cust)
            trader.save()
            rel = RelationShip.objects.create(
                    cust=cust,
                    trader=trader,
                )
            rel.save()
            data = f'Congratulation you have Hire Mr {trader.cust.user.username}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except Trader.DoesNotExist:
            return Response({"Message":"Trader Not Found With Given Id"},status=status.HTTP_404_NOT_FOUND)
    return Response({"Message":"Please select a Trader whom u want to Hire"}, status.HTTP_400_BAD_REQUEST)




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def searchTrader(request,pk=None):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        id=pk
        trader=Trader.objects.get(id=pk)
        # data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def seeRecordOfTrader(request,pk=None):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        id=pk
        trader=Trader.objects.get(id=pk)
        # data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)




@api_view(['GET',])
@permission_classes([IsAuthenticated])
def HiresList(request):
    if request.method == 'GET':
        cust=Customer.objects.get(user=request.user)
        data = Trader.objects.filter(clients=cust)
        print(cust)
        print(len(data))
        serializer = TraderSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)









@api_view(['POST',])
@permission_classes([IsAuthenticated])
def createWatchlist(request):
    name=request.data['name']
    print(name)
    cust = Customer.objects.get(user=request.user)            
    try:
        watchlist=Watchlist.objects.get(name=name,cust=cust)
        return Response({'message': 'Watchlist With Same Name Already Present'}, status=status.HTTP_201_CREATED)
    except Watchlist.DoesNotExist:
        watchlist = Watchlist.objects.create(name=name,cust=cust)
        return Response({'message': 'Watchlist Created'}, status=status.HTTP_201_CREATED)






@api_view(['POST',])
@permission_classes([IsAuthenticated])
def addToWatchlist(request,id=None):
    if request.method == 'POST':
        try:
            # Get the Stock and User objects
            stock_id=int(request.data['stock_id'])
            name=request.data['name']
            stock = Stock.objects.get(id=stock_id)
            cust = Customer.objects.get(user=request.user)            
            try:
                watchlist=Watchlist.objects.get(name=name,cust=cust)    
            except Watchlist.DoesNotExist:
                watchlist = Watchlist.objects.create(name=name,cust=cust)
            watchlist.stock.add(stock)
            watchlist.save()
            # Return success response
            return Response({'message': 'Successful'}, status=status.HTTP_201_CREATED)
        except Stock.DoesNotExist:
            return Response({'error': 'Stock does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET',])
@permission_classes([IsAuthenticated])
def myWatchlist(request,pk=None):
    try:
        cust = Customer.objects.get(user=request.user)
    except Customer.DoesNotExist:
        return Response({"Error":"Customer Not Exist"},status=status.HTTP_404_NOT_FOUND)
    if pk==None:
        try:
            watchlist = Watchlist.objects.filter(cust=cust)
            serializer = WatchlistSerializer(data=watchlist,many=True)
            serializer.is_valid()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Watchlist.DoesNotExist:
           return Response({'error': 'No any Watchlist Found Fot You'}, status=status.HTTP_404_NOT_FOUND)
    else:
        try:
            watchlist = Watchlist.objects.get(id=pk)
            serializer = WatchlistSerializer(data=watchlist)
            serializer.is_valid()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Watchlist.DoesNotExist:
           return Response({'error': 'No any Watchlist Found with this id'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET',])
@permission_classes([IsAuthenticated])
def myStock(request,id=None):
    if request.method == 'GET':
        cust = Customer.objects.get(user=request.user)
        print(cust.user.username)
        
        try:
            stocks = Order.objects.filter(cust=cust)
            print(len(stocks))
            serializer = OrderSerializer(data=stocks,many=True)
            serializer.is_valid()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
           return Response({'error': 'No any Order Found For You'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    else:
        return Response({'error': 'Request Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)







@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def Status(request):
    if request.method == 'GET':
        data = f"{request.user}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)