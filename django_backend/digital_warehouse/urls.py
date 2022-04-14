from django.urls import re_path as url,include
from .views import *

app_name = 'digital_warehouse_app'

urlpatterns = [
    url(r'^products/$', ProductsListView.as_view(), name='products-list-api'),
]