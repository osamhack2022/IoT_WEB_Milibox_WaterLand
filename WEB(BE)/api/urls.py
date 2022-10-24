from django.urls import path 
from django.conf import settings 
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [ 
    path("v1/user", MOUSViewSet.as_view({"get": "list"}), name="mous"),
    path("v1/records", RecordViewSet.as_view({"get": "list"}), name="records"),
    path("v1/upload", RecordUploadView.as_view(), name="upload"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)