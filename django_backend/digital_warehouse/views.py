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


# This is the Client List View
class ClientsListView(ListCreateAPIView):
    authentication_classes = []
    serializer_class = ClientSerializer
    model = Client
    queryset = Client.objects.all()


#  This is the Product Detail View for simple CRUD operations
class ProductDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = []
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'product_id'
    queryset = Product.objects.all()



#  This is the Category Detail View for simple CRUD operations
class CategoryDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = []
    serializer_class = CategorySerializer
    lookup_url_kwarg = 'category_id'
    queryset = Category.objects.all()



#  This is the Client Detail View for simple CRUD operations
class ClientDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = []
    serializer_class = ClientSerializer
    lookup_url_kwarg = 'client_id'
    queryset = Client.objects.all()


#  This is the Order List and Create View
class OrderListView(APIView):

    authentication_classes = []

    def get(self, request):
        orders = Order.objects.all()
        order_serializer = OrderSerializer(orders, many=True).data
        return Response(order_serializer, status=status.HTTP_200_OK)
        

    def post(self, request):

        data = request.data

        client = Client.objects.get(id = data['client_id'])
        if(data['confirmed'] == True):
            client.amount_of_works += 1;
            client.save()

        order = Order(client=client, description=data['description'], scale=data['scale'], confirmed=data['confirmed'], bill_for_service=data['bill_for_service'])
        order.save()

        for prod_var in data['product_variations']:
            product_variation = ProductVariation(product_id=prod_var['id'], amount=prod_var['amount'], pricing=prod_var['amount'] * prod_var['base_pricing'], order=order)
            order.pricing_materials += (prod_var['amount'] * prod_var['base_pricing'])
            product_variation.save()   

        order.save()
        
        order.total_cost = (order.pricing_materials + order.bill_for_service) + (order.pricing_materials + order.bill_for_service) * 0.07
        order.save()

        return Response({"Result": "Success"}, status=status.HTTP_200_OK)