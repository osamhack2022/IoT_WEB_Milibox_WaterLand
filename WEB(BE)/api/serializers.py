from .models import *
from rest_framework import serializers

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        record = Record.objects.all()
        model = Record
        fields = '__all__'  # __all__ 을 줄 경우, 모든 필드가 사용됨.
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


class MOUSQuerySerializer(serializers.Serializer):
    sn = serializers.CharField(help_text="군번", required=True)