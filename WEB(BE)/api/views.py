from rest_framework import status, viewsets, mixins 
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework import parsers, renderers, serializers, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.views import View 
from django.http import Http404
from .models import * 
from .serializers import *
from rest_framework import views


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
    serializer_class = RecordSerializer
    http_method_names = ['post', ]

    def create(self, request, *args, **kwargs):
        documents = request.FILES.getlist('document', None)
        data = {
            "title": request.POST.get('title', None),
            }
        _serializer = self.serializer_class(data=data, context={'documents': documents})
        if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # NOQA
# class RecordUploadView(views.APIView):
#     parser_classes = [MultiPartParser]

#     @swagger_auto_schema(operation_description='암호화된 영상을 업로드하는 API',)
#     def post(self, request, format=None):
#         file_obj = request.data['file']
#         # ...
#         # do some stuff with uploaded file
#         # ...
#         return Response(status=204)

# class RecordUploadView(CreateAPIView):
#     parser_classes = (MultiPartParser,)

#     @swagger_auto_schema(operation_description='Upload file...',)
#     @action(detail=False, methods=['post'])
#     def upload(self, request):
#         # serializer = self.serializer_class(data=request.data)
#         # if serializer.is_valid(raise_exception=True):
#         #     data = serializer.validated_data
#         # resume = data["resume"]
#         #     # resume.name - file name
#         #     # resume.read() - file contens
#         #     return Response({"success": "True"})
        
#         record_set = self.context['request'].FILES
#         for record_data in record_set.getlist('record'):
#             Record.objects.create(file_name=record_data.name, file=record_data)
#         return Response({'success': "False"}, status=status.HTTP_400_BAD_REQUEST)


#         record_set = self.context['request'].FILES
#         for record_data in record_set.getlist('record'):
#             Record.objects.create(file=record_data)
        




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
