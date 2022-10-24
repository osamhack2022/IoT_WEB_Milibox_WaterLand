from django.urls import path 
from django.conf import settings 
from .views import *

urlpatterns = [ 
    path("v1/user", MOUSViewSet.as_view({"get": "list"}), name="mous"),
    path("v1/records", RecordViewSet.as_view({"get": "list"}), name="records"),
]