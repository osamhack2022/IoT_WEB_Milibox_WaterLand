import picamera
import datetime


NORMAL_MODE = '일반모드'
MILITARY_MODE = '부대모드'

with picamera.PiCamera() as camera:
    is_military_mode = False
    camera.start_preview(fullscreen=True)
    start_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    camera.start_recording(start_time)
    while True:
        camera.annotate_text = f"{MILITARY_MODE if is_military_mode else NORMAL_MODE}\n {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        # Todo: 통신해서 주변에 장비(위병소)가 있는지 확인
        # if 통신
        #     start_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        #     is_military_mode = False if is_military_mode else True
        #     camera.start_recording(start_time)