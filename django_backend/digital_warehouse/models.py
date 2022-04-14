from django.db import models


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

    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id) + " - " + self.title + " - " + self.category.title

