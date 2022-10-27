from .models import *
from rest_framework import serializers

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        record = Record.objects.all()
        model = Record
        fields = ('id', 'file_name', 'owner', 'created_at', 'approved_at','unit',)
        #fields = '__all__'  # __all__ 을 줄 경우, 모든 필드가 사용됨.
        # fields = ('id', 'created_at', 'title', 'category', 'star_rating',)  # req, res 시 사용되길 원하는 필드(컬럼)만 적어줘도 됨.


    def create(self, validated_data):
        records = self.context['records']
        for record in records:
            Record.objects.create(file=record)


class ViewHistorySerializer(serializers.ModelSerializer):
    sn = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    rank = serializers.SerializerMethodField()

    def get_sn(self, obj):
        return obj.viewer.sn

    def get_name(self, obj):
        return obj.viewer.nm

    def get_rank(self, obj):
        return obj.viewer.rk

    class Meta:
        mous = ViewHistory.objects.all()
        model = ViewHistory
        fields = ('sn', 'ip_address', 'name', 'rank')


class MOUSSerializer(serializers.ModelSerializer):
    class Meta:
        mous = MOUS.objects.all()
        model = MOUS
        fields = ('sn', 'rk', 'nm')


class AdminSerializer(serializers.ModelSerializer):
    sn = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    rank = serializers.SerializerMethodField()
    unit_name = serializers.SerializerMethodField()

    def get_sn(self, obj):
        return obj.user.sn

    def get_name(self, obj):
        return obj.user.nm

    def get_rank(self, obj):
        return obj.user.rk

    def get_unit_name(self, obj):
        return obj.unit.name

    class Meta:
        record = Admin.objects.all()
        model = Admin
        fields = ('sn', 'type', 'name', 'rank', 'unit', 'unit_name')


class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        record = Org.objects.all()
        model = Org
        fields = '__all__'


class ViewHistoryQuerySerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="녹화영상 식별자(ID)", required=True)


class MOUSQuerySerializer(serializers.Serializer):
    sn = serializers.CharField(help_text="군번", required=True)


class MOUSSearchQuerySerializer(serializers.Serializer):
    name = serializers.CharField(help_text="이름", required=True)


class RecordQuerySerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="녹화영상 식별자(ID)", required=True)


class OrgQuerySerializer(serializers.Serializer):
    parent = serializers.IntegerField(help_text="상위부대 ID", required=False)


class AdminBodySerializer(serializers.Serializer):
    sn = serializers.CharField(help_text="군번", required=True)
    unit = serializers.IntegerField(help_text="부대 ID값", required=True)
    type = serializers.ChoiceField(help_text="관리자 유형", choices=('MASTER', 'ADMIN'))