from django.urls import path
from trader.views import TraderAPIView,My_Clients_TraderAPIView

urlpatterns = [
    path('',TraderAPIView.as_view()),
    path('clients/',My_Clients_TraderAPIView.as_view()),
    path('<int:pk>/',TraderAPIView.as_view()),
    # path('<int:pk>/clients',TraderAPIView.as_view()),
]