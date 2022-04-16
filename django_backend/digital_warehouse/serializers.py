from rest_framework import serializers
from .models import *
from django.contrib import auth
from rest_framework.validators import UniqueValidator

from django.contrib.auth.models import User

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

# This is the Order Serializer
class OrderSerializer(serializers.ModelSerializer):

    client = ClientSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'



class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=255)
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        user = auth.authenticate(**data)
        if user and user.is_active:
            return user
        elif user:
            raise serializers.ValidationError("User not active")
        else:
            raise serializers.ValidationError("No user")
        raise serializers.ValidationError("Incorrect credentials")



class UserSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', )