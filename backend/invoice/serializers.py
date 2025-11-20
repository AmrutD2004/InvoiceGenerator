from rest_framework import serializers
from .models import * 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ("id", "email")

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__" 
        read_only_fields = ("total",)

class InvoiceSerializer(serializers.ModelSerializer):
    items = ItemsSerializer(many = True)
    class Meta:
        model = Invoice
        fields = ["id","user","invoiceNumber","invoiceDate","dueDate","businessName","businessEmail","businessAddress","businessPhone","clientName","clientEmail","clientAddress","clientPhone","notes","paymentTerms","status","subtotal","taxTotal","total","items",]

        read_only_fields = ("subtotal", "taxTotal", "total")
    def create(self, validated_data):
        #extract the items from the items list berfor creation of Invoice
        items_data = validated_data.pop('items')


        #Create Invoice
        invoice = Invoice.objects.create(**validated_data)

        #loop each items present in items
        #mean,  Create each item and attach to invoice

        for item_data in items_data:
            subtotal = item_data["quantity"] * float(item_data["unitPrice"])
            tax = subtotal * (float(item_data["taxPercent"]) / 100)
            total = subtotal + tax

            new_item = Item.objects.create(
            **item_data,
            total=total  # save total for this item
            )
            invoice.items.add(new_item)
        invoice.calculate_totals()

        return invoice