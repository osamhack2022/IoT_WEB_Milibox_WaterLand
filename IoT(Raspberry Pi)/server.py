import os
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

def make_key():
    private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
    public_key = private_key.public_key()

    pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        )
    with open('private_key.pem', 'wb') as f:
        f.write(pem)

    pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
    with open('public_key.pem', 'wb') as f:
        f.write(pem)


def decrypt_file(file_path):
    if os.path.exists('/' + file_path):
        print("파일이 존재하지 않습니다.")
        return False
    
    # 서버 비밀키 열기
    with open("private_key.pem", "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

    # 암호화된 영상파일 열기
    with open(file_path + '.enc', 'rb') as file:
        encrypted = file.read()

    # 암호화된 대칭키파일 열기
    with open(file_path + '.enckey', 'rb') as file:
        encrypted_symmetric_key = file.read()

    # 암호화된 대칭키 복호화
    symmetric_key = private_key.decrypt(
        encrypted_symmetric_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # 대칭키로 암호화된 영상파일 복호화
    f = Fernet(symmetric_key)
    decrypted = f.decrypt(encrypted)
    
    with open(file_path + '', 'wb') as file:
        file.write(decrypted)
