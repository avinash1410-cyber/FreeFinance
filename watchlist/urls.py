from django.urls import path
from .views import *

urlpatterns = [
    path('<int:pk>/',WatchlistAPIView.as_view()),
    path('',WatchlistAPIView.as_view(),name="MyWatchlist"),
]