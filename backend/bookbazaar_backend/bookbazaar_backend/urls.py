from django.contrib import admin
from django.urls import path, include
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/books/', include('books.urls')),   
    path('api/orders/', include('orders.urls')), 
    path('api/users/', include('users.urls')),    
] 
