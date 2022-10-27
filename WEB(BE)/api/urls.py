from django.urls import path 
from django.conf import settings 
from .views import *

urlpatterns = [ 
    path("v1/user", MOUSViewSet.as_view({"get": "list"}), name="mous"),
    path("v1/user/search", MOUSSearchViewSet.as_view({"get": "search"}), name="moussearch"),
    path("v1/admin", AdminViewSet.as_view({"get": "list"}), name="admin"),
    path("v1/admin/list", AdminListViewSet.as_view({"get": "list"}), name="admin-list"),
    path("v1/records/list", RecordListViewSet.as_view({"get": "list"}), name="records"),
    path("v1/record/history", RecordHistoryViewSet.as_view({"get": "list"}), name="record_history"),
    path("v1/record", RecordViewSet.as_view({"get": "download"}), name="downloadrecord"),
    path("v1/org", OrgViewSet.as_view({"get": "list"}), name="orglist"),
    path("v1/upload", RecordUploadView.as_view(), name="upload"),
]