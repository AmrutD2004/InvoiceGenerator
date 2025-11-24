from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .models import * 
from .serializers import *
# Create your views here.


@api_view(["POST"])
def user_register(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"User registered successfully"}, status=201)
    return Response({"message":"User already exists please try another email"}, status=400)

@api_view(["POST"])
def user_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email, password=password)
        return Response({"message": "Login Sucessfull", "userID":user.id,
                         "userName":user.username, "eMail":user.email, "businessname":user.businessName, "address":user.address, "phone":user.phone}, status=200)
    except:
        return Response({"message":"Invalid Credentials"}, status=401)

@api_view(["GET"])
def user_data(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message":"User Not found"}, status=401)
    serializers = UserSerializer(user)
    return Response(serializers.data, status=200)


       

@api_view(["PUT"])
def update_profile(request, user_id):
    user = User.objects.get(id=user_id)

    try:
         serializer = UserSerializer(user, data = request.data, partial=True)
         if serializer.is_valid():
            serializer.save()
            return Response({"message":"Profile Updated Successfully"}, status=200)
    except:
        return Response({"message":"Something went wrong"}, status=401)
    return Response(serializer.errors, status=400)

@api_view(["POST"])
def create_invoice(request):
    serializer = InvoiceSerializer(data=request.data)

    if serializer.is_valid():
        invoice = serializer.save()
        return Response(InvoiceSerializer(invoice).data, status=201)

    return Response(serializer.errors, status=400)


@api_view(['GET'])
def all_invoices(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message":"User Not found"}, status=401)
    invoice = Invoice.objects.filter(user=user)
    serializers = InvoiceSerializer(invoice, many=True)
    return Response(serializers.data, status=200)

@api_view(['PUT'])
def invoice_status(request, invoice_id):
    try:
        invoice = Invoice.objects.get(id=invoice_id)
    except Invoice.DoesNotExist:
        return Response({"message":"Invoice doesn't exists"},status=404)
    new_status = request.data.get('status')
    if new_status not in ['Paid', 'Unpaid']:
        return Response({"message": "Invalid status"}, status=400)
    invoice.status = new_status
    invoice.save()

    serializers = InvoiceSerializer(invoice)
    return Response(serializers.data, status=200)


@csrf_exempt
@api_view(['DELETE'])
def delete_invoice(request, invoice_id):
    try:
        invoice = Invoice.objects.get(id=invoice_id)
        invoice.delete()
        return Response({"message":"Invoice Deleted Successfully"})
    except:
        return Response({"message":"Please try again!"})
    
@api_view(['GET'])
def invoice_detail(request, invoice_id):
    try:
        invoice = Invoice.objects.get(id=invoice_id)

        serializers = InvoiceSerializer(invoice)
        return Response(serializers.data, status=200)
    except Invoice.DoesNotExist:
        return Response({"message": "Invoice not found"}, status=404)

    except Exception as e:
        return Response({"message": "Something went wrong"}, status=500)