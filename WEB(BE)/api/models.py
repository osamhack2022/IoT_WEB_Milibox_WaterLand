from django.db import models

# 영상파일
class Record(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='영상 ID값')
    file_name = models.CharField(null=False, max_length=255, verbose_name='파일명')
    file = models.FileField(null=True, verbose_name='영상파일')
    owner = models.CharField(null=False, max_length=20, verbose_name='소유자 군번')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='추가된 날짜')
    approved_at = models.DateTimeField(auto_now=True, verbose_name='업뎃 된 날짜')
    unit = models.CharField(null=False, max_length=255, verbose_name='녹화된 부대')

    def __str__(self):
        return f"{self.file_name} {self.owner} {self.unit}"


# 조회기록
class ViewHistory(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='조회기록 ID값')
    viewer = models.CharField(null=False, max_length=20, verbose_name='조회자 군번')
    ip_address = models.CharField(null=False, max_length=255, verbose_name='조회한 IP주소')
    record_id = models.ForeignKey("Record", on_delete=models.CASCADE, verbose_name='녹화영상 ID값')

    
# 특정 파일 조회권한
class Permission(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='조회권한 ID값')
    record_id = models.ForeignKey("Record", on_delete=models.CASCADE, verbose_name='녹화영상 ID값')
    allowed_user = models.CharField(null=False, max_length=20, verbose_name='권한부여받은 유저 군번')


# 반출 요청/승인





class MOUS(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='MOUS ID값')
    sn = models.CharField(null=False, max_length=20, verbose_name='군번')
    rk = models.CharField(null=False, max_length=20, verbose_name='계급')
    nm = models.CharField(null=False, max_length=20, verbose_name='이름')

    def __str__(self):
        return f"{self.sn} {self.rk} {self.nm}"
