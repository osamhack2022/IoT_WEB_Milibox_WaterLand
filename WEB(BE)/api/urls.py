from django.urls import path 
from django.conf import settings 
from .views import *

urlpatterns = [ 
    path("v1/user", MOUSViewSet.as_view({"get": "list"}), name="mous"),
    path("v1/user/search", MOUSSearchViewSet.as_view({"get": "search"}), name="moussearch"),
    path("v1/admin", AdminViewSet.as_view({"get": "list", "post": "add"}), name="admin"),
    path("v1/admin/list", AdminListViewSet.as_view({"get": "list"}), name="admin-list"),
    path("v1/admin/takeout", ApprovalViewSet.as_view({"post": "approve"}), name="approve"),
    path("v1/admin/takeout/list", ApprovalViewSet.as_view({"get": "list"}), name="admin-takeout-list"),
    path("v1/records/list", RecordListViewSet.as_view({"get": "list"}), name="records"),
    path("v1/records/shared/list", RecordListViewSet.as_view({"get": "sharedlist"}), name="records"),
    path("v1/records/admin/list", RecordListViewSet.as_view({"get": "adminlist"}), name="records"),
    path("v1/records/share", ShareViewSet.as_view({"post": "share"}), name="share"),
    path("v1/records/takeout", ApprovalViewSet.as_view({"post": "request"}), name="approve request"),
    path("v1/record/history", RecordHistoryViewSet.as_view({"get": "list"}), name="record_history"),
    path("v1/record", RecordViewSet.as_view({"get": "download"}), name="downloadrecord"),
    path("v1/org", OrgViewSet.as_view({"get": "list"}), name="orglist"),
    path("v1/upload", RecordUploadView.as_view(), name="upload"),
]