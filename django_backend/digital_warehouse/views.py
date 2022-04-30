from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from knox.models import AuthToken

from .models import *
from .serializers import *

# Create your views here.

# This is the Product List View
class ProductsListView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    model = Product
    queryset = Product.objects.all()




# This is the Category List View
class CategoriesListView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    model = Category
    queryset = Category.objects.all()


# This is the Client List View
class ClientsListView(ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = ClientSerializer
    model = Client
    queryset = Client.objects.all()


#  This is the Product Detail View for simple CRUD operations
class ProductDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'product_id'
    queryset = Product.objects.all()



#  This is the Category Detail View for simple CRUD operations
class CategoryDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    lookup_url_kwarg = 'category_id'
    queryset = Category.objects.all()



#  This is the Client Detail View for simple CRUD operations
class ClientDetailView(RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = ClientSerializer
    lookup_url_kwarg = 'client_id'
    queryset = Client.objects.all()


#  This is the Order List and Create View
class OrderListView(APIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

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

        order = Order(client=client, description=data['description'], scale=data['scale'], confirmed=data['confirmed'], 
            bill_for_service=data['bill_for_service'], start_date=data['start_date'], end_date=data['end_date']
        )
        order.save()

        for prod_var in data['product_variations']:
            product_variation = ProductVariation(product_id=prod_var['id'], amount=prod_var['amount'], pricing=float(prod_var['amount']) * float(prod_var['base_pricing']), base_pricing=float(prod_var['base_pricing']), order=order)
            product_variation.save() 
            order.pricing_materials += (float(prod_var['amount']) * float(prod_var['base_pricing']))
              

        order.save()
        
        order.total_cost = (order.pricing_materials + order.bill_for_service) + (order.pricing_materials  * 0.07)
        order.save()

        return Response({"Result": "Success"}, status=status.HTTP_200_OK)


#  This is the Order Detail View for simple CRUD operations
class OrderDetailView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, order_id):

        order = Order.objects.get(id=order_id)
        product_variations = ProductVariation.objects.filter(order=order)

        order_serializer = OrderSerializer(order).data
        product_variations_serializer = ProductVariationSerializer(product_variations, many=True).data
        
        return Response({"Order": order_serializer, "Products": product_variations_serializer}, status=status.HTTP_200_OK)

    def post(self, request, order_id):

        data = request.data

        client = Client.objects.get(id = data['client_id'])

        order = Order(id=order_id)
        order.client=client
        order.description=data['description']
        order.scale=data['scale']
        order.confirmed=data['confirmed']
        order.bill_for_service=data['bill_for_service']
        order.pricing_materials = 0 
        order.total_cost = 0
        order.start_date = data['start_date']
        order.start_date = data['end_date']
        order.save()

        ProductVariation.objects.all().filter(order=order).delete()

        for prod_var in data['product_variations']:
            product_variation = ProductVariation(product_id=prod_var['product']['id'], amount=prod_var['amount'], pricing=float(prod_var['amount']) * float(prod_var['base_pricing']), base_pricing=float(prod_var['base_pricing']), order=order)
            order.pricing_materials += (float(prod_var['amount']) * float(prod_var['base_pricing']))
            product_variation.save()   

        order.save()
        
        order.total_cost = order.pricing_materials + (order.pricing_materials * 0.07)  + order.bill_for_service
        order.save()

        return Response({"Result": "Success"}, status=status.HTTP_200_OK)

    def delete(self, request, order_id):
        order = Order.objects.get(id=order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(APIView):

    permission_classes = (AllowAny,)

    def post(self, request):

        data = request.data

        user_serializer = LoginSerializer(data=data)
        
        if user_serializer.is_valid() == False:
            return Response({'Result': "No user with that credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = user_serializer.validated_data
        
        result = AuthToken.objects.create(user)[1]
        return Response({'Result': result}, status=status.HTTP_200_OK)
        

class CheckAuthenticatedView(RetrieveAPIView):

    permission_classes = (AllowAny,)

    serializer_class = UserSimpleSerializer

    def get_object(self):
        print(self.request.user)
        return self.request.user