from rest_framework import status, viewsets, mixins 
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework import parsers, renderers, serializers, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.views import View 
from django.http import Http404
from django.core.files.base import ContentFile
from .models import * 
from .serializers import *
from rest_framework import views
from milibox_decrypter import MiliboxDecrypter


class RecordViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 암호화 녹화 영상 제출 및 복호화된 녹화영상 조회 API
    """

    serializer_class = RecordSerializer

    queryset = Record.objects.all()

    def list(self, request, *args, **kwargs):
        user_sn = self.request.session['sn']

        records = Record.objects.filter(owner=user_sn)
        if not records.exists():
            raise Http404()

        return Response(RecordSerializer(records, many=True).data)

class RecordUploadView(views.APIView):
    parser_classes = (FormParser, MultiPartParser)

    @swagger_auto_schema(operation_description='암호화된 영상을 업로드하는 API',)
    def post(self, request, format=None):
        user_sn = self.request.session['sn']
        decrypter = MiliboxDecrypter()
        for encrypted_file in request.FILES.getlist('record'):
            result, military_unit_code, content = decrypter.decrypt_file(encrypted_file)
            if result == True:
                filename = encrypted_file.name.split('.milibox')[0]
                file = ContentFile(content, name=f"{filename}.h264")
                Record.objects.create(file_name=filename, file=file, owner=user_sn, unit=military_unit_code)
            print(f"파일업로드: {encrypted_file.name} {result} 부대: {military_unit_code}")
        return Response(status=204)


class MOUSViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # SSO를 통한 사용자체계상 이용자 정보 호출
    """

    serializer_class = MOUSSerializer

    @swagger_auto_schema(query_serializer=MOUSQuerySerializer)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        conditions = {
            'sn': self.request.GET.get('sn', None)
        }

        mous = MOUS.objects.filter(**conditions)
        if not mous.exists():
            raise Http404()

        self.request.session['sn'] = self.request.GET.get('sn', None)
        return mous
