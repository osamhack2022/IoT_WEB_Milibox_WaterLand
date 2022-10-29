from rest_framework import status, viewsets, mixins 
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework import parsers, renderers, serializers, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import FileResponse
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from django.views import View 
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from .models import * 
from .serializers import *
from rest_framework import views
from milibox_decrypter import MiliboxDecrypter
from datetime import datetime
from django.utils import timezone


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class RecordListViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 복호화된 녹화영상 목록 조회 API
    """

    serializer_class = RecordSerializer

    queryset = Record.objects.all()

    @swagger_auto_schema(operation_description='본인이 업로드한 녹화영상 조회API',) 
    def list(self, request, *args, **kwargs):
        user_sn = request.META.get('HTTP_SN')
        print(user_sn)
        records = Record.objects.filter(owner=user_sn)

        return Response(RecordSerializer(records, many=True).data)


    @swagger_auto_schema(operation_description='공유받은 녹화영상 조회API',) 
    def sharedlist(self, request, *args, **kwargs):
        user_sn = request.META.get('HTTP_SN')
        print(user_sn)
        user = MOUS.objects.get(sn=user_sn)
        permissions = Permission.objects.filter(allowed_user=user)
        records = [i.record for i in permissions]

        return Response(RecordSerializer(records, many=True).data)

    @swagger_auto_schema(operation_description='관리자 담당부대에서 업로드한 녹화영상 조회API',) 
    def adminlist(self, request, *args, **kwargs):
        user_sn = request.META.get('HTTP_SN')
        print(user_sn)
        user = MOUS.objects.get(sn=user_sn)
        admin = Admin.objects.get(user=user)
        
        records = Record.objects.filter(unit=admin.unit.name)

        return Response(RecordSerializer(records, many=True).data)

class RecordHistoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 녹화영상 조회기록 API
    """

    serializer_class = ViewHistorySerializer

    queryset = ViewHistory.objects.all()

    @swagger_auto_schema(query_serializer=ViewHistoryQuerySerializer)
    def list(self, request, *args, **kwargs):
        record_id = self.request.GET.get('id', None)

        record = Record.objects.get(id=record_id)

        historys = ViewHistory.objects.filter(record=record)

        return Response(ViewHistorySerializer(historys, many=True).data)


class PassthroughRenderer(renderers.BaseRenderer):
    """
        Return data as-is. View should supply a Response.
    """
    media_type = ''
    format = ''
    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data


class RecordViewSet(viewsets.ReadOnlyModelViewSet):
    """
    # 복호화된 녹화영상 조회 API
    영상조회시 조회기록(로그) 생성 및 접근 권한에 따른 파일 제한 조치
    ## 조회권한
    - 본인이 업로드한 영상
    - 조회 권한을 부여받은 영상
    - 관리자의 경우 본인의 관리부대에 해당하는 영상
    - 최고관리자의 경우 모든 영상
    """

    queryset = Record.objects.all()

    @swagger_auto_schema(query_serializer=RecordQuerySerializer)
    @action(methods=['get'], detail=True, renderer_classes=(PassthroughRenderer,))
    def download(self, *args, **kwargs):
        record_id = self.request.GET.get('id', None)
        record = Record.objects.get(id=record_id)
        viewer_sn = self.request.GET.get('sn', None)
        print(viewer_sn)
        viewer = MOUS.objects.get(sn=viewer_sn)
        
        permission = Permission.objects.filter(record=record, allowed_user=viewer)
        master = Admin.objects.filter(type='MASTER', user=viewer)
        admin = Admin.objects.filter(type='ADMIN', user=viewer, unit=record.unit)
        if record.owner != viewer_sn and not permission.exists() and not master.exists() and not admin.exists():
            raise Http404()
    
        ViewHistory.objects.create(viewer=viewer, ip_address=get_client_ip(self.request), record=record)

        file_handle = record.file.open()

        response = FileResponse(file_handle, content_type='whatever')
        response['Content-Length'] = record.file.size
        response['Content-Disposition'] = 'attachment; filename="%s"' % record.file.name

        return response


class RecordUploadView(views.APIView):
    """
    # 암호화된 영상을 업로드하는 API

    업로드 변수는 "record"로 다중 파일 업로드 가능
    """

    parser_classes = (FormParser, MultiPartParser)

    #@swagger_auto_schema(operation_description='암호화된 영상을 업로드하는 API',)
    def post(self, request, format=None):
        user_sn = request.META.get('HTTP_SN')
        print(user_sn)
        decrypter = MiliboxDecrypter()
        print(request.FILES)
        for encrypted_file in request.FILES.getlist('record'):
            result, military_unit_code, content = decrypter.decrypt_file(encrypted_file)
            if result == True:
                filename = encrypted_file.name.split('.milibox')[0]
                file = ContentFile(content, name=f"{filename}")
                unit = Org.objects.get(id=military_unit_code)
                Record.objects.create(file_name=filename, file=file, owner=user_sn, unit=unit)
            print(f"파일업로드: {encrypted_file.name} {result} 부대: {military_unit_code}")
        return Response(status=200)


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
            'sn': self.request.GET.get('sn', self.request.META.get('HTTP_SN'))
        }

        mous = MOUS.objects.filter(**conditions)
        if not mous.exists():
            raise Http404()

        return mous


class MOUSSearchViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # SSO를 통한 사용자체계상 이용자 정보 호출
    """

    serializer_class = MOUSSerializer

    @swagger_auto_schema(query_serializer=MOUSSearchQuerySerializer)
    def search(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        conditions = {
            'nm__contains': self.request.GET.get('name', '')
        }
        print(self.request.GET.get('name', None))

        mous = MOUS.objects.filter(**conditions)

        return mous


class OrgViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 부대 정보 호출
    하위 부대 목록 반환
    """

    queryset = Org.objects.all()

    serializer_class = OrgSerializer

    @swagger_auto_schema(query_serializer=OrgQuerySerializer)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        conditions = {
            'parent': self.request.GET.get('parent', None)
        }

        orgs = Org.objects.filter(**conditions)
        
        return orgs


class AdminViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 관리자 정보 호출
    """

    serializer_class = AdminSerializer

    @swagger_auto_schema(query_serializer=MOUSQuerySerializer)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        try:
            user = MOUS.objects.get(sn=self.request.GET.get('sn', None))
            admin = Admin.objects.filter(user=user)
            return admin
        except:
            raise Http404()


    @swagger_auto_schema(request_body=AdminBodySerializer, operation_description='관리자 등록\nMASTER만 관리자등록가능',) 
    def add(self, request):
        try:
            login_user = self.request.session.get('sn', self.request.META.get('HTTP_SN'))
            admin = Admin.objects.get(user=login_user)
            if admin.type == "Master":
                user = MOUS.objects.get(sn=request.data['sn'])
                unit = Org.objects.get(id=request.data['unit'])
                type = request.data['type']

                admins = Admin.objects.filter(user=user)
                if admins.exists():
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
                
                admin = Admin.objects.create(user=user, unit=unit, type=type)

                return Response(AdminSerializer(admin).data, status=status.HTTP_201_CREATED)
            else:
                raise Http404()
        except:
            raise Http404()


class AdminListViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 관리자 목록 호출
    부대관리자면 해당부대 관리자 목록,
    최고관리자면 모든관리자 목록을 반환
    """

    serializer_class = AdminSerializer

    def list(self, request, *args, **kwargs):
        print(request.META.get('HTTP_SN'))
        try:
            mous = MOUS.objects.get(sn=request.META.get('HTTP_SN'))
            admin = Admin.objects.get(user=mous)
            
            if admin.type == "MASTER":
                admins = Admin.objects.all()
            elif admin.type == "ADMIN":
                admins = Admin.objects.filter(unit=admin.unit)

            return Response(AdminSerializer(admins, many=True).data)
        except:
            raise Http404()


class ShareViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 녹화영상 공유 API
    """

    @swagger_auto_schema(request_body=ShareBodySerializer) 
    def share(self, request):
        try:
            # 공유대상 영상 소유자인지 확인
            login_user_sn = request.META.get('HTTP_SN')
            login_user = MOUS.objects.get(sn=login_user_sn)

            taker_sn = request.data['sn']
            taker = MOUS.objects.get(sn=taker_sn)
            record_id = request.data['record_id']
            record = Record.objects.get(id=record_id)

            if record.owner == login_user.sn:
                Permission.objects.create(record=record, allowed_user=taker)
                content = {'result': 'success'}
                return Response(content, status=status.HTTP_201_CREATED)
            else:
                # 이용자가 소유한 영상이아님.
                raise Http404()
        except:
            raise Http404()


class ApprovalViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, View): 
    """
    # 반출 승인
    """

    serializer_class = RecordSerializer

    @swagger_auto_schema(operation_description='관리자가 승인할수있는 승인 요청 목록',) 
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        try:
            user_sn = self.request.META.get('HTTP_SN')
            print(user_sn)

            user = MOUS.objects.get(sn=user_sn)
            admin = Admin.objects.get(user=user)
            if admin.type == "MASTER":
                records = Record.objects.filter(approval_status='PENDING')
            elif admin.type == "ADMIN":
                records = Record.objects.filter(approval_status='PENDING', unit=admin.unit)
            return records
        except:
            raise Http404()


    @swagger_auto_schema(request_body=ApprovalRequestBodySerializer, operation_description='반출 요청',) 
    def request(self, request):
        try:
            user_sn = self.request.META.get('HTTP_SN')
            print(user_sn)

            record_id = request.data['record_id']
            comment = request.data['comment']

            record = Record.objects.get(id=record_id)
            if record.approval_status == 'NOTHING':
                record.approval_status = 'PENDING'
                record.approval_comment = comment
                record.request_at = timezone.now()
                record.save()
                return Response(RecordSerializer(record).data, status=status.HTTP_201_CREATED)
            else:
                raise Http404()
        except:
            raise Http404()
    

    @swagger_auto_schema(request_body=ApprovalResponseBodySerializer, operation_description='반출 요청 승인/거절 처리',) 
    def approve(self, request):
        try:
            user_sn = self.request.META.get('HTTP_SN')
            print(user_sn)

            user = MOUS.objects.get(sn=user_sn)
            record_id = request.data['record_id']
            comment = request.data['comment']
            action = request.data['action']


            record = Record.objects.get(id=record_id)
            if record.approval_status == 'PENDING':
                if action.upper() == 'APPROVE':
                    record.approval_status = 'APPROVED'
                else:
                    record.approval_status = 'REJECTED'
                    record.reject_comment = comment
                record.approved_at = timezone.now()
                record.approver = user
                record.save()
                return Response(RecordSerializer(record).data, status=status.HTTP_201_CREATED)
            else:
                raise Http404()
        except:
            raise Http404()