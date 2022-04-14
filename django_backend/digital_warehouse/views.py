from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import *
from rest_framework.views import APIView

from .models import *
from .serializers import *

# Create your views here.

# This is the Product List View
class ProductsListView(ListCreateAPIView):
    authentication_classes = []
    serializer_class = ProductSerializer
    model = Product
    queryset = Product.objects.all()




# This is the Category List View
class CategoriesListView(ListCreateAPIView):
    authentication_classes = []
    serializer_class = CategorySerializer
    model = Category
    queryset = Category.objects.all()


#  This is the Product Detail View for simple CRUD operations
class ProductDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = []
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'product_id'
    queryset = Product.objects.all()