from django.db import models
from order.models import Order
from account.models import Customer
from trader.models import Trader

# Create your models here.
class RelationShip(models.Model):
    trader=models.ForeignKey(Trader,null=True,blank=True,on_delete=models.CASCADE)
    cust=models.ForeignKey(Customer,null=True,blank=True,on_delete=models.CASCADE)
    invetsed=models.IntegerField(max_length=100,null=True,blank=True)
    Turnout=models.IntegerField(max_length=100,null=True,blank=True)
    orders=models.ForeignKey(Order,null=True,blank=True,on_delete=models.CASCADE)