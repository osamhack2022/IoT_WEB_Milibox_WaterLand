from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view( 
    openapi.Info( 
        title="국방블랙박스 인트라넷 웹서비스 API", 
        default_version="v1", 
        description="국방블랙박스 인트라넷 웹서비스를 위한 API 문서", 
        terms_of_service="https://github.com/osamhack2022/IoT_WEB_Milibox_WaterLand", 
        contact=openapi.Contact(name="박정섭", email="parkjeongseop@parkjeongseop.com"), 
        license=openapi.License(name="MIT"), 
    ), 
    public=True, 
    permission_classes=(permissions.AllowAny,), 
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(("api.urls", "api"))),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),    ]