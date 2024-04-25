from django.db import models
from django.contrib.auth.models import User
from stock.models import Stock
from account.models import Customer
from trader.models import Trader

class Order(models.Model):
    stock = models.ForeignKey(Stock, null=True, blank=True, on_delete=models.CASCADE)
    cust = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.CASCADE)
    amount = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    orderDate = models.DateTimeField(auto_now=True)
    buy = models.ForeignKey(Trader, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.cust.user.username