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