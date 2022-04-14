from django.urls import re_path as url,include
from .views import *

app_name = 'digital_warehouse_app'

urlpatterns = [
    url(r'^products/$', ProductsListView.as_view(), name='products-list-api'),
    url(r'^categories/$', CategoriesListView.as_view(), name='categories-list-api'),
    url(r'^product/(?P<product_id>\d+)/$', ProductDetailView.as_view(), name='product-detail-api'),
]