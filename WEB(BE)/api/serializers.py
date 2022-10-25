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

class MOUSSerializer(serializers.ModelSerializer):
    class Meta:
        mous = MOUS.objects.all()
        model = MOUS
        fields = ('sn', 'rk', 'nm')

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        record = Admin.objects.all()
        model = Admin
        fields = '__all__'

class MOUSQuerySerializer(serializers.Serializer):
    sn = serializers.CharField(help_text="군번", required=True)


class RecordQuerySerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="녹화영상 식별자(ID)", required=True)