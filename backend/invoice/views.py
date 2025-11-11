from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
                         "userName":user.username, "eMail":user.email}, status=200)
    except:
        return Response({"message":"Invalid Credentials"}, status=401)