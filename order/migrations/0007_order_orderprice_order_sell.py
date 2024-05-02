# Generated by Django 4.0.1 on 2024-05-01 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0006_alter_order_amount_alter_order_buy_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderPrice',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='sell',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
