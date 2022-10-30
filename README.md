
# 국방 블랙박스 (군부대 출입차량용 암호화 영상기록 체계)

<div align=center>

![Logo](/Docs/Images/milibox.gif)
</div>
  <center><h3>국방 블랙박스 : 군부대 출입차량용 암호화 영상기록 체계</h3></center>
><center><h3>보안과 편리성을 위한 암호화 블랙박스</h3></center>

## 목차

1. [개요](#%EA%B0%9C%EC%9A%94-abstract)
2. [소개](#%EC%86%8C%EA%B0%9C-introduction)
3. [시연 영상](#%EC%86%8C%EA%B0%9C-%EC%98%81%EC%83%81-video-clips)
4. [기능 설명](#%EA%B8%B0%EB%8A%A5-%EC%84%A4%EB%AA%85-functions)
5. [기기 구성/필수 조건 안내](#%EA%B8%B0%EA%B8%B0-%EA%B5%AC%EC%84%B1--%ED%95%84%EC%88%98-%EC%A1%B0%EA%B1%B4-%EC%95%88%EB%82%B4-prerequisites)
6. [기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-technique-used)
7. [설치 안내](#%EC%84%A4%EC%B9%98-%EC%95%88%EB%82%B4-installation-process)
8. [프로젝트 관리 및 개발 문서](#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EA%B0%9C%EB%B0%9C-%EB%AC%B8%EC%84%9C-project-management)
9. [팀 정보](#%ED%8C%80-%EC%A0%95%EB%B3%B4-team-information)
10. [저작권 및 사용권 정보](#%EC%A0%80%EC%9E%91%EA%B6%8C-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EA%B6%8C-%EC%A0%95%EB%B3%B4-copyleft--end-user-license)


## 개요 (Abstract)
군부대는 부대구조나 보안시설 노출 방지를 위해 사진 촬영, 동영상 녹화가 금지되어있습니다. 그렇기에 개인용 휴대전화의 카메라를 MDM 소프트웨어(국방모바일보안)로 부대출입시 차단하고, 차량용 영상기록장치(블랙박스)는 부대에서 제공하는 가림막을 설치한뒤 출입합니다. 매 출입시 가림막을 설치했다가 제거했다가를 매일 반복해야함을 물론 가림막을 해놓으면 부대내에서 블랙박스를 활용할 수 없습니다. 이를 해결하고자 군부대용 차세대 블랙박스를 고안했습니다. 
  
## 소개 (Introduction)
해당 블랙박스를 이용시 군 부대 이외의 지역에서 는 일반적인 블랙박스와 같이 작동합니다. 부대 출입시 RF모듈을 통해 통신하여 출입을 인식하여 부대로 들어온경우 블랙박스가 촬영은 하되 영상을 암호화하여 메모리에 저장합니다. 암호화된 영상파일은 블랙박스 소유주라도 마음대로 열람할 수 없습니다. 만약 부대 내에서 주행중 사고나 주차중 사고등으로 열람이 필요한 경우 인트라넷(국방망) 웹에서 부대내 차량용 영상기록판독요청체계를 이용하여 암호화파일을 업로드하면 서버에서 복호화를 진행하여 웹을 통해 재생이 가능합니다. 사고 수사 등으로 운전자가 사고 영상을 군내에 사고처리 담당자 등 제출해야하는 경우 웹체계내에서 담당자를 지정하여 제출이가능하고, 군외부로 반출이 필요한 경우 반출 요청을 하고 부대관리자의 승인을 통해 외부 인터넷망으로 반출이 가능합니다.

  
## 소개 영상 (Video Clips)

## 기능 설명 (Functions)
* 로그인 화면
<div align=center>

![로그인 화면](/Docs/Images/login.png)
</div>

* 초기 화면(일반 사용자)
<div align=center>

![초기 화면](/Docs/Images/list1.png)
</div>

* 영상 업로드 과정
<div align=center>

![영상 업로드 과정](/Docs/Images/upload.png)

![영상 업로드 과정](/Docs/Images/upload2.png)
</div>

* 영상 업로드 완료 화면
<div align=center>

![영상 업로드 완료 화면](/Docs/Images/list2.png)
</div>


* 영상 조회 화면 - 복호화된 블랙박스 영상을 조회할 수 있습니다.
<div align=center>

![영상 조회 화면](/Docs/Images/view1.png)
</div>

* 해당 영상을 조회한 사용자 목록 및 정보를 확인할 수 있습니다. 또한 다른 사용자가 영상을 조회할 수 있도록 해주는 “공유하기” 기능도 사용할 수 있습니다.
<div align=center>

![영상 조회 화면](/Docs/Images/view2.png)
</div>

* 공유받은 영상 - 다른 사용자로부터 공유받은 영상을 조회할 수 있습니다.
<div align=center>

![공유받은 영상](/Docs/Images/sharelist.png)
</div>


* 영상은 “반출 신청”을 통해 자료교환체계를 이용하여 보험사 혹은 수사기관에 제출할 수 있습니다.
<div align=center>

![반출 신청](/Docs/Images/view3.png)
</div>

* 반출 신청 완료 화면
<div align=center>

![반출 신청 완료 화면](/Docs/Images/takeout.png)
</div>

* 사용자 정보 화면
<div align=center>

![사용자 정보 화면](/Docs/Images/admincreate.png)
</div>

* 사용자 관리 화면(최고관리자 전용)
<div align=center>

![사용자 관리 화면](/Docs/Images/adminlist.png)
</div>

* 영상 반출 승인 관리(부대관리자 전용) - 사용자가 반출 신청한 영상에 보안 위반 소지가 있는지 검토하고, 해당 영상의 반출을 승인·거절할 수 있습니다.
<div align=center>

![영상 반출 승인 관리](/Docs/Images/approvelist.png)
![영상 반출 승인 관리](/Docs/Images/approve1.png)
</div>



# 개발 계획 및 목표
1주차: 아이디어 세부 기획

2-4주차: 개발 진행
[IoT]
- 하드웨어 설계
- 임베디드 소프트웨어개발
- RF통신하여 부대 출입 인식하여 일반모드/부대모드 전환
- 일반모드: 영상촬영 저장 / 부대모드: 영상촬영하여 암호화하여 저장
- 부대모드->일반모드전환시 암호화영상 파일 삭제(자료 필요시 사고발생직후 파일 추출 필요)
[Web]
- "부대내 차량용 영상기록판독요청체계" 개발
- 사용자가 로그인(국방망 전군사용자체계 MOUS) 로그인(가상)
- 판독요청서류 작성 및 암호화 영상 파일 제출 기능
- 관리자(관련 부서)페이지에서는 암호화된 영상파일을 체계상에서 복호화하여 제공

5주차:
[IoT]
[Web]

6,7주차: 영상 및 문서 준비

매주 2회정도의 회의
[국방 블랙박스 케이스 3D 모델링 Tinkercad](https://www.tinkercad.com/things/4JHKmULFASb)
# 기대 효과 및 전망
부대 내에서 그동안 군사보안을 위해 교통안전과 사고처리에 블랙박스를 활용하지 못하였는데 본 솔루션으로 두마리 토끼를 잡을수있습니다. 또, 부대내에서 블랙박스 가림막을 제대로 설치하지않아 군사보안 유출의 우려를 줄일 수 있습니다. 마지막으로 사용자는 매번 가림막 설치,제거를 번거롭게 할 필요가 없어집니다.

# 팀장 역할
현재 개발병으로 복무하며 국방망 웹 응용체계를 개발하고있고, 이전 직장에서 IoT장비를 개발해본 경험이 있어 본 프로젝트에 전반적으로 기여할 수 있습니다. 지원자 분들의 역량에 맞게 제가 개발에 참여할 파트를 조율할 수 있습니다. 또한, 본 솔루션과 관련하여 특허출원도 진행시도중에있습니다.



# Project name or Logo


프로젝트명 또는 프로젝트 로고 이미지 **(택1)**

## 프로잭트 소개
- 설명 기입


## 기능 설명
 - 설명 기입

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Server(back-end)
 -  nodejs, php, java 등 서버 언어 버전 
 - express, laravel, sptring boot 등 사용한 프레임워크 
 - DB 등 사용한 다른 프로그램 
 
### Front-end
 -  react.js, vue.js 등 사용한 front-end 프레임워크 
 -  UI framework
 - 기타 사용한 라이브러리

## 설치 안내 (Installation Process)
### Web(Back-end)
```bash
$ git clone https://github.com/osamhack2022-v2/IoT_WEB_Milibox_WaterLand
$ cd WEB(BE)/
$ python -m venv <venv_name>
$ <venv_name>/Scripts/activate.bat
$ pip install -r requirements.txt
$ python manage.py runserver <ip>:<port>
```

### Web(Front-end)
```bash
$ git clone https://github.com/osamhack2022-v2/IoT_WEB_Milibox_WaterLand
$ cd WEB(FE)/
$ 
```

### IoT(Raspberry Pi) (블랙박스)
```bash
$ git clone https://github.com/osamhack2022-v2/IoT_WEB_Milibox_WaterLand
$ cd IoT(Raspberry Pi)/BlackBox_Device/
$ python -m venv <venv_name>
$ <venv_name>\Scripts\activate
$ pip install -r requirements.txt
$ python milibox.py
```

### IoT(Raspberry Pi) (위병소 통신 장비)
```bash
$ git clone https://github.com/osamhack2022-v2/IoT_WEB_Milibox_WaterLand
$ cd IoT(Raspberry Pi)/Gate_Device/
$ python -m venv <venv_name>
$ <venv_name>\Scripts\activate
$ pip install -r requirements.txt
$ python milibox.py
```

## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**

잘 모를 경우
구글 검색 - 마크다운 문법
[https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017](https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017)

 편한 마크다운 에디터를 찾아서 사용
 샘플 에디터 [https://stackedit.io/app#](https://stackedit.io/app#)
 
## 팀 정보 (Team Information)
- 박정섭 (parkjeongseop@parkjeongseop.com), Github Id: [ParkJeongseop](https://github.com/ParkJeongseop)
- 노우준 (woojunro0223@gmail.com), Github Id: [woojunro](https://github.com/woojunro)

- 멘토: 고수창 멘토님

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)