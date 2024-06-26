# Generated by Django 4.0.1 on 2024-04-24 08:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('order', '0005_alter_order_amount'),
        ('trader', '0001_initial'),
        ('account', '0002_alter_customer_balance'),
    ]

    operations = [
        migrations.CreateModel(
            name='RelationShip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invetsed', models.IntegerField(blank=True, max_length=100, null=True)),
                ('Turnout', models.IntegerField(blank=True, max_length=100, null=True)),
                ('cust', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='account.customer')),
                ('orders', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='order.order')),
                ('trader', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trader.trader')),
            ],
        ),
    ]
