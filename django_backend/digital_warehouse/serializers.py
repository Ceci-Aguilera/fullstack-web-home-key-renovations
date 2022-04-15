from rest_framework import serializers
from .models import *

# This is the Product Serializer (simple version) returns the category as id field
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'




# This is the Category Serializer
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


# This is the Category Serializer
class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = '__all__'

# This is the Order Serializer
class OrderSerializer(serializers.ModelSerializer):

    client = ClientSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


# This is the Product Variation Serializer
class ProductVariationSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVariation
        fields = '__all__'
