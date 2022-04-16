from django.db import models
import datetime


class Category(models.Model):
    title = models.CharField(max_length=50, blank=False)

    class Meta:
        verbose_name_plural="categories"

    def __str__(self):
        return str(self.id) + " - " + self.title



class Product(models.Model):

    title = models.CharField(max_length=50, blank=False)
    description = models.TextField(blank=True)
    pricing = models.FloatField(default=0.0)

    height = models.FloatField(default=0.0)
    width = models.FloatField(default=0.0)

    comments = models.TextField(blank=True)

    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        if self.category is not None:
            return str(self.id) + " - " + self.title + " - " + self.category.title
        else:
            return str(self.id) + " - " + self.title + " - " + "No Category"




class Client(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField( max_length=256, unique=True)
    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=256)
    amount_of_works = models.IntegerField(default=0)

    def __str__(self):
        return self.first_name + " " + self.last_name



class Order(models.Model):

    description = models.TextField(blank=True)
    pricing_materials = models.FloatField(default=0.0)
    bill_for_service = models.FloatField(default=0.0)
    scale = models.CharField(max_length=50, default="Low")
    # This includes the 0.7 of taxes
    total_cost = models.FloatField(default=0.0)
    client = models.ForeignKey(Client, blank=True, null=True, on_delete=models.CASCADE)

    confirmed = models.BooleanField(default=False)

    start_date = models.DateTimeField(blank=True, default=datetime.date.today)
    end_date = models.DateTimeField(blank=True, default=datetime.date.today)

    def __str__(self):
        return str(self.id) + " " + self.description



class ProductVariation(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)
    pricing = models.FloatField(default=0.0)

    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.product.title + " " + str(self.amount)

