from django.urls import re_path as url,include
from .views import *
from knox import views as knox_views

app_name = 'digital_warehouse_app'

urlpatterns = [
    url(r'^products/$', ProductsListView.as_view(), name='products-list-api'),
    url(r'^categories/$', CategoriesListView.as_view(), name='categories-list-api'),
    url(r'^clients/$', ClientsListView.as_view(), name='clients-list-api'),
    url(r'^product/(?P<product_id>\d+)/$', ProductDetailView.as_view(), name='product-detail-api'),
    url(r'^category/(?P<category_id>\d+)/$', CategoryDetailView.as_view(), name='category-detail-api'),
    url(r'^client/(?P<client_id>\d+)/$', ClientDetailView.as_view(), name='client-detail-api'),
    url(r'^orders/$', OrderListView.as_view(), name='orders-list-api'),
    url(r'^order/(?P<order_id>\d+)/$', OrderDetailView.as_view(), name='order-detail-api'),
    url(r'^logout/$', knox_views.LogoutView.as_view(), name='knox-logout-api'),
    url(r'^login/$', LoginView.as_view(), name='login-api'),
    url(r'^check-auth/$', CheckAuthenticatedView.as_view(), name='check-auth-api'),
]