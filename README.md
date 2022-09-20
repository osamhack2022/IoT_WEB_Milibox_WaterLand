### 국방 블랙박스 (군부대 출입차량용 영상기록 체계)
# 아이템 개요
군부대는 부대구조나 보안시설 노출 방지를 위해 사진 촬영, 동영상 녹화가 금지되어있습니다. 그렇기에 개인용 휴대전화의 카메라를 MDM 소프트웨어(국방모바일보안)로 부대출입시 차단하고, 차량용 영상기록장치(블랙박스)는 부대에서 제공하는 가림막을 설치한뒤 출입합니다. 매 출입시 가림막을 설치했다가 제거했다가를 매일 반복해야함을 물론 가림막을 해놓으면 부대내에서 블랙박스를 활용할 수 없습니다. 이를 해결하고자 군부대용 차세대 블랙박스를 고안했습니다. 해당 블랙박스를 이용시 군 부대 이외의 지역에서 는 일반적인 블랙박스와 같이 작동합니다.

부대 출입시 RF모듈을 통해 통신하여 출입을 인식하여 부대로 들어온경우 블랙박스가 촬영은 하지만 이를 암호화하여 메모리에 저장합니다. 암호화된 영상은 블랙박스 소유주는 열람할 수 없습니다. 만약 부대 내에서 주행중 사고나 주차중 사고등으로 열람이 필요한 경우 인트라넷(국방망) 웹에서 부대내 차량용 영상기록판독요청체계를 이용하여 운전자가 암호화된 영상을 제출하면 관련 부서에서 체계에서 자동으로 복호화된 영상을 보고 필요한 부분만을 체계를 통해 운전자에게 제공하거나 관련 수사를 진행 할 수 있도록합니다.
부대를 벗어나는 경우 부대내에서 촬영된 암호화된 영상파일은 자동으로 삭제처리하고 일반적인 블랙박스로 다시 전환하여 암호화되지않는 영상파일로 녹화를 합니다.

추가기능들로는 부대내에서 군사시설 보안을 위해 상업용 네비게이션의 지도데이터가 없어 작동하지않는데, 부대내의 곳에 설치된 RF모듈 통신을 통해 속도제한 등의 정보를 수신하여 차량의 속도가 제한속도보다 넘는 경우 알림음을 내는 등의 기능도 생각해볼수 있습니다.

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

# 기대 효과 및 전망
부대 내에서 그동안 군사보안을 위해 교통안전과 사고처리에 블랙박스를 활용하지 못하였는데 본 솔루션으로 두마리 토끼를 잡을수있습니다. 또, 부대내에서 블랙박스 가림막을 제대로 설치하지않아 군사보안 유출의 우려를 줄일 수 있습니다. 마지막으로 사용자는 매번 가림막 설치,제거를 번거롭게 할 필요가 없어집니다.

# 팀장 역할
현재 개발병으로 복무하며 국방망 웹 응용체계를 개발하고있고, 이전 직장에서 IoT장비를 개발해본 경험이 있어 본 프로젝트에 전반적으로 기여할 수 있습니다. 지원자 분들의 역량에 맞게 제가 개발에 참여할 파트를 조율할 수 있습니다. 또한, 본 솔루션과 관련하여 특허출원도 진행시도중에있습니다.



# Project name or Logo
![Logo](https://logosbynick.com/wp-content/uploads/2018/03/final-logo-example.png)

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
```bash
$ git clone git주소
$ yarn or npm install
$ yarn start or npm run start
```

## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**

잘 모를 경우
구글 검색 - 마크다운 문법
[https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017](https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017)

 편한 마크다운 에디터를 찾아서 사용
 샘플 에디터 [https://stackedit.io/app#](https://stackedit.io/app#)
 
## 팀 정보 (Team Information)
- 박정섭 (parkjeongseop@parkjeongseop.com), Github Id: ParkJeongseop
- 노우준 (woojunro0223@gmail.com), Github Id: 

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

※ [라이선스 비교표(클릭)](https://olis.or.kr/license/compareGuide.do)

※ [Github 내 라이선스 키워드(클릭)](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

※ [\[참조\] Github license의 종류와 나에게 맞는 라이선스 선택하기(클릭)](https://flyingsquirrel.medium.com/github-license%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EB%82%98%EC%97%90%EA%B2%8C-%EB%A7%9E%EB%8A%94-%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0-ae29925e8ff4)