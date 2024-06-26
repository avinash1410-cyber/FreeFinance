from django.urls import path,include
from account.views import *

urlpatterns = [
    path('',CustomerAPIView.as_view()),
    path('update/',update_trader.as_view()),
    path('logout/',logout_page),
    path('login/',login_page,name='login'),
    path('register/',register_page),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('test/', testEndPoint, name='test'),
    path('buy_stock/', buyStock),
    path('sell_stock/', sellStock),
    path('my_watchlist/', myWatchlist),
    path('my_watchlist/<int:pk>/', myWatchlist),
    path('my_stocks/', myStock),
    path('create_watchlist/', createWatchlist),
    path('add_to_watchlist/', addToWatchlist),
    # path('sell_options/', sellOption),
    # path('buy_options/', buyOption),
    path('search/',search_trader),
    path('hire_trader/<int:pk>/',hireTrader),
    path('remove_trader/<int:pk>/',removeTrader),
    path('hires_list/',HiresList),
    path('addBalance/',addBalance),
    path('withdrawBalance/',withdrawBalance),
    # path('status',Status),
    # path('status/<int:pk>',status),
]