from django.urls import path 
from django.conf import settings 
from .views import *

urlpatterns = [ 
    path("v1/user", MOUSViewSet.as_view({"get": "list"}), name="mous"),
    path("v1/records/list", RecordListViewSet.as_view({"get": "list"}), name="records"),
    path("v1/record", RecordViewSet.as_view({"get": "download"}), name="downloadrecord"),
    path("v1/upload", RecordUploadView.as_view(), name="upload"),
]