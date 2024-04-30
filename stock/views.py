from rest_framework.views import APIView
from .models import Stock
from .serializers import StockSerializer
from rest_framework.response import Response
from django.db.models import Q
from cloudinary.forms import cl_init_js_callbacks      
from rest_framework.decorators import api_view, permission_classes
import requests
from rest_framework import status


class StockSearchAPIView(APIView):
    def get(self, request, query=None):
        try:
            stocks = Stock.objects.filter(Q(name__icontains=query))
            data = StockSerializer(stocks, many=True)
            return Response(data.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class Home(APIView):
#     def get(self, request):
#         def get_stock_price(symbol):
#             api_key = "Y5CIFL2TLHX4S7C6"  # Replace with your Alpha Vantage API key
#             url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}"

#             try:
#                 response = requests.get(url)
#                 data = response.json()

#                 if "Error Message" in data:
#                     return None

#                 stock_info = data["Global Quote"]
#                 price = stock_info["05. price"]
#                 volume = int(stock_info["06. volume"])
#                 return {"price": price, "volume": volume}
#             except Exception as e:
#                 return {"error": str(e)}

#         symbols = ["AAPL", "TSLA","MSFT","JPM","V"]
#         stock_prices = {}
#         for symbol in symbols:
#             price = get_stock_price(symbol)
#             if price:
#                 stock_prices[symbol] = price

#         return Response(stock_prices)




class Home(APIView):
    def get(self, request):
        try:
            stocks = Stock.objects.all()  # Correct method to get all objects
            serializer = StockSerializer(stocks, many=True)  # Instantiate serializer without data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)















class StockAPIView(APIView):
    def get(self, request, pk=None, format=None):
        try:
            data = Stock.objects.get(id=pk)
            serializer = StockSerializer(data)
            return Response(serializer.data)
        except Stock.DoesNotExist:
            return Response({"message": "Not valid id"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def StockMonthlyAPIView(self, request, pk=None, format=None):
    try:
        data = Stock.objects.get(id=pk)
        serializer = StockSerializer(data)
        return Response(serializer.data)
    except Stock.DoesNotExist:
        return Response({"response": "Not valid id"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def StockYearlyAPIView(self, request, pk=None, format=None):
    try:
        data = Stock.objects.get(id=pk)
        serializer = StockSerializer(data)
        return Response(serializer.data)
    except Stock.DoesNotExist:
        return Response({"response": "Not valid id"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def StockWeeklyAPIView(self, request, pk=None, format=None):
    try:
        data = Stock.objects.get(id=pk)
        serializer = StockSerializer(data)
        return Response(serializer.data)
    except Stock.DoesNotExist:
        return Response({"response": "Not valid id"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)