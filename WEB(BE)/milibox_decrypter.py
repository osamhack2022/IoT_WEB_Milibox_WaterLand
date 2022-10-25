from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

class MiliboxDecrypter:
    FORMAT_SIGNATURE = b'This is a recorded video file encrypted on MILIBOX.'
    KEY_BEGIN = b'\n-----BEGIN ENCRYPTED SYMMETRIC KEY-----\n'
    KEY_END = b'\n-----END ENCRYPTED SYMMETRIC KEY-----\n'
    MILITARY_UNIT_CODE_BEGIN = b'\n-----BEGIN ENCRYPTED MILITARY UNIT CODE-----\n'
    MILITARY_UNIT_CODE_END = b'\n-----END ENCRYPTED MILITARY UNIT CODE BEGIN-----\n'
    RECORD_BEGIN = b'\n-----BEGIN ENCRYPTED RECORDED VIDEO-----\n'

    def __init__(self) -> None:
        # 서버 비밀키 열기
        with open("private_key.pem", "rb") as key_file:
            self.private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None,
                backend=default_backend()
            )

    def decrypt_file(self, file):
        # 암호화된 파일 검증 및 키, 부대코드, 영상파일 분리
        temp = file.read().split(MiliboxDecrypter.RECORD_BEGIN)

        encrypted_content = temp[1]
        encrypted_military_unit_code = temp[0].split(MiliboxDecrypter.MILITARY_UNIT_CODE_BEGIN)[1].split(MiliboxDecrypter.MILITARY_UNIT_CODE_END)[0]
        encrypted_symmetric_key = temp[0].split(MiliboxDecrypter.KEY_BEGIN)[1].split(MiliboxDecrypter.KEY_END)[0]
        signature = temp[0].split(MiliboxDecrypter.KEY_BEGIN)[0] 

        if signature != MiliboxDecrypter.FORMAT_SIGNATURE:
            return False

        # 암호화된 대칭키 복호화
        symmetric_key = self.private_key.decrypt(
            encrypted_symmetric_key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        # 대칭키로 암호화된 영상파일 복호화
        f = Fernet(symmetric_key)
        military_unit_code = f.decrypt(encrypted_military_unit_code)
        content = f.decrypt(encrypted_content)

        return True, military_unit_code, content
