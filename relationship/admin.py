from django.contrib import admin

from relationship.models import RelationShip

# Register your models here.
class RelationShipAdmin(admin.ModelAdmin):
    list_display = [field.name for field in RelationShip._meta.fields]  # Specify the fields you want to display in the list view

admin.site.register(RelationShip,RelationShipAdmin)