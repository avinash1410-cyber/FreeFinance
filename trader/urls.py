from django.urls import path
from trader.views import TraderProfileAPIView,My_Clients_TraderAPIView,TraderClientAPIView,MyTraderProfileAPIView,TraderClientBuyAPIView,TraderClientSellAPIView,TraderClientOrderAPIView

urlpatterns = [
    path('',TraderProfileAPIView.as_view()),
    path('client/<int:pk>/buy/',TraderClientBuyAPIView.as_view()),
    path('client/<int:pk>/order/',TraderClientOrderAPIView.as_view()),
    path('client/<int:pk>/sell/',TraderClientSellAPIView.as_view()),
    path('my_profile/',MyTraderProfileAPIView.as_view()),
    path('profile/<int:pk>/',TraderProfileAPIView.as_view()),
    path('client/<int:pk>/',TraderClientAPIView.as_view()),
    path('clients/',My_Clients_TraderAPIView.as_view()),
]