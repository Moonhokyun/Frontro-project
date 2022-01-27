# SNS 은이네 문방구

<p align="center" >
<kbd>
<img src= "https://user-images.githubusercontent.com/89507327/150966513-0aa78354-efe4-4d7f-9b92-f0e389804c4f.jpg">
</kbd>
</p>

<pre>
  멋쟁이사자처럼 프론트엔드 스쿨 1기 내 그룹으로 진행한 프로젝트입니다.  
  10-20대 팬시 상품에 관심이 있는 사람들을 타겟으로, 문구 제품 등을 구매하거나 공유할 수 있는 플랫폼입니다. 
  
  문구상품이라는 공통된 주제로 서로 일상을 공유하고 SNS 활동을 통해 소통을 할 수 있습니다. 
  글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수 있습니다. 다른 사용자를 팔로우하면 유저가 올린 게시물을 홈 피드에서 소식을 확인할 수도 있습니다. 
</pre>

## Stack

### Frontend

-   HTML
-   CSS
-   JavaScript

### Backend

-   제공된 API 사용

## Product

[은이네 문방구 바로가기](https://frontro-project-one.vercel.app/splash_screen.html)

[유튜브](https://www.youtube.com/watch?v=4ioUUzX3cDQ)

[피그마](https://www.figma.com/file/DbwQBUDLWaS783BVhDltfw/%EC%9D%80%EC%9D%B4%EB%84%A4-%EB%AC%B8%EB%B0%A9%EA%B5%AC?node-id=1%3A622)

[포트폴리오](https://github.com/charile1/Frontro-project/files/7948078/default.pdf)



# 역할

## Member

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/gureumwoon"
        ><img
          src="https://avatars.githubusercontent.com/gureumwoon"
          width="100px;"
          alt=""
        /><br /><sub><b>김채운</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/Moonhokyun"
        ><img
          src="https://avatars.githubusercontent.com/Moonhokyun"
          width="100px;"
          alt=""
        /><br /><sub><b>문호균</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/charile1"
        ><img
          src="https://avatars.githubusercontent.com/charile1"
          width="100px;"
          alt=""
        /><br /><sub><b>박경서</b></sub></a
      ><br />
    </td>
    <td align="center">
      <a href="https://github.com/leewooseong"
        ><img
          src="https://avatars.githubusercontent.com/leewooseong"
          width="100px;"
          alt=""
        /><br /><sub><b>이우성</b></sub></a><br />
    </td>
  </tr>
</table>

## 디자인 및 UI 모듈 제작 

| 이름       | 모듈                                                        |
| ---------- | ----------------------------------------------------------- |
| **문호균** | top-menu , UI 디자인, 브랜딩 로고 제작 |
| **박경서** | home-post, buttons                                          |
| **이우성** | user-search, user-follow, text-active-input, delete-alert   |

## Page UI 및 기능 구현

| 이름       | pages                                                                            |
| ---------- | -------------------------------------------------------------------------------- |
| **문호균** | splash-screen, 로그인, 404 페이지                              |
| **박경서** | 회원가입, 피드(홈), 검색, 좋아요 버튼                             |
| **이우성** | 사용자 프로필 페이지, 채팅 목록 & 채팅방, 팔로워 & 팔로잉 목록, 좋아요 버튼      |
| **김채운** | 내 프로필 수정 , 상품 등록, 게시글 댓글, 게시글 작성 & 수정 페이지 , 좋아요 버튼 |

# 상세 기능

<h2>💧splash (문호균) </h2>

-   서비스 접속 초기 화면입니다.
-   splash 화면이 잠시 나온 뒤 다음 페이지가 나타납니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/84977026/150928634-20b09743-f7be-42b4-9134-6c9fa078c64f.gif">
</kbd>
</p>

<h2>💧로그인 (문호균)</h2>

-   로그인은 **로그인 메인 화면**과 **이메일 로그인 화면**으로 나눠져 있습니다.
-   SNS (카카오톡, 구글, 페이스북) 로그인은 화면에 배치만 되어져 있습니다.
-   `이메일로 로그인`을 클릭하면 이메일로 로그인 할 수 있는 화면으로 이동합니다.
-   이메일과 비밀번호를 모두 입력하면 `다음` 버튼이 활성화 됩니다. 입력되지 않은 입력창이 있다면 버튼은 활성화 되지 않습니다.
-   `로그인` 버튼을 클릭하면 이메일 주소와 로그인에 대한 유효성 검사를 진행하며, 이메일 주소 또는 비밀번호가 일치하지 않으면 경고문구가 나타납니다.
-   입력창에 focus가 될 경우 선의 색이 변합니다. (회색, #DBDBDB → **노란색, #FFC022**)

<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/84977026/150928718-838c4047-1e88-48a2-9d2f-0cc07bd7283a.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>이메일로 로그인 이동</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/84977026/150928755-acbe15cc-2cac-4c53-87de-7fb14f22a9a2.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>로그인 후 홈 화면 이동</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/84977026/150928834-48f4535d-2cfc-461d-9d60-1bfaddad9c06.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>유효성 검사 실패</b></sub><br />
    </td>
  </tr>
</table>

---

## 💧회원가입 (박경서)

-   회원가입 화면 이동
    -   로그인 메인 화면에서 `회원가입` 을 누르거나 이메일 로그인 화면에서 `이메일로 회원가입` 을 누르면 회원가입 화면이 나타납니다.
-   회원가입 유효성 검사
    -   이메일 주소 또는 비밀번호를 입력하고 입력창에서 포커스를 잃으면 바로 유효성 검사가 진행되고 통과하지 못한 경우 경고 문구가 각 입력창 하단에 표시됩니다.
    -   이메일 주소의 형식이 유효하지 않거나 이미 가입된 이메일일 경우, 또는 비밀번호가 6자 미만일 경우에는 각 입력창 하단에 경구 문구가 나타납니다.
    -   입력창에 focus 될 경우에는 선의 색이 변합니다.(회색, #DBDBDB → 노란색, #EB5757)
    -   작성이 완료된 후, 유효성 검사를 통과할 경우 `다음` 버튼이 활성화되며, 버튼을 클릭하면 프로필 설정 폼이 나타납니다.
-   프로필 설정
    -   프로필 설정에 필요한 프로필 사진, 사용자 이름(2~10자 이내), 계정 ID, 소개를 입력받습니다.
    -   프로필 사진은 등록하지 않을 경우 기본 이미지가 등록됩니다.
    -   사용자 이름과 소개는 다른 사용자와 중복될 수 있습니다.
    -   계정 ID에 대한 중복 유무와 형식을 검사합니다.
    -   작성이 완료된 후, 유효성 검사를 통과할 경우 `은이네 문방구 시작하기` 버튼이 활성화되며, 버튼을 클릭하면 다시 로그인 페이지가 나타납니다.

<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150941506-775d8215-e64b-4707-b7e3-2dbb52143a50.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>회원가입 화면 이동</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150942314-4a09a24f-84e9-4087-ab1c-c4a9122cffbd.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>회원가입 유효성 검사</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150945741-91513041-d691-4ee0-91f9-48fa6c251700.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>프로필 설정 폼</b></sub><br />
    </td>
  </tr>
</table>

## 💧 은이네 문방구 피드 (박경서)

-   은이네 문방구 피드는 사용자들이 올린 게시글들이 표시되는 페이지입니다.

-   팔로우가 없는 경우
    -   팔로우한 사용자가 없을 경우와 내가 팔로우한 사용자가 올린 게시글이 없는 경우 "유저를 검색해 팔로우 해보세요!" 문구와 함께 `검색하기` 버튼이 표시됩니다.
-   팔로우가 있는 경우
    -   자신이 팔로우한 사용자의 게시글만 확인할 수 있습니다.
    -   `댓글 아이콘` 클릭 시 상세 페이지 이동이 가능합니다.
    -   `더보기 버튼`을 클릭하면 신고하기 모달 창이 뜹니다.
    -   가로스크롤로 사용자의 이미지 슬라이드를 확인 할 수 있습니다.
    -   `사용자 프로필 사진, 사용자 이름, 계정 ID` 클릭 시 해당하는 유저의 프로필로 이동합니다.
-   좋아요 기능
    -   게시글 하단에는 하트 모양에 좋아요 버튼이 있습니다.
    -   빈 하트를 클릭하면 색이 칠해지고 좋아요 수가 증가하고, 색이 칠해진 하트를 클릭하면 빈 하트로 변하고 좋아요 수가 감소합니다.

<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150957884-404c20ee-497b-4112-9926-507ad037e7f8.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>팔로워가 없는 경우</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150957985-f673da31-d096-480e-aa40-c46fc635a444.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>팔로워가 있는 경우</b></sub><br />
    </td>
   <td align="center">
        <img
          src="https://user-images.githubusercontent.com/89507327/150958286-88467eae-0b65-486a-8503-bdfba083e816.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>좋아요 기능, 모달창 구현, 이미지 슬라이드
        </b></sub><br />
    </td>
  </tr>
</table>

## 💧 검색 (박경서)

- 은이네 문방구 피드 상단에 돋보기 버튼(검색 버튼)을 클릭하면 표시되는 페이지입니다.
- 사용자 이름을 검색할 수 있는 페이지입니다.
- 사용자 이름을 클릭하면 사용자의 프로필로 이동합니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/89507327/151304262-bee897c8-105f-4c1c-87ab-10d344230884.gif">
</kbd>
</p>

---

<h2>💧 사용자 프로필 페이지 (이우성)</h2>

-   사용자의 `프로필` 및 `판매 중인 상품`, 사용자가 `작성한 게시글`이 나타나는 화면입니다.
-   `사용자 계정`을 나타내는 페이지(my_porfile.html), `다른 사용자의 계정`을 나타내는 페이지(your_profile.html)로 사용자에 따라 나타나는 화면이 구분됩니다.
-   로그인 시 발급 받은 토큰을 이용하여 API 요청을 통해 데이터를 받아오고 표시해줍니다.

**프로필**

-   `프로필에 관한 정보`를 표시하며 관련 정보를 수정할 수 있습니다.
-   공통
    -   프로필 사진, 사용자 이름, 계정 ID, 소개글, 팔로워, 팔로잉 수는 API를 통해 받아온 데이터를 표시해줍니다.
    -   팔로워, 팔로잉을 클릭하게 되면 사용자가 팔로잉 또는 팔로우하는 유저들의 목록을 확인할 수 있는 팔로워, 팔로잉 목록 페이지로 넘어가게 됩니다.
-   `사용자 계정`을 나타내는 페이지(my_profile.html)
    -   프로필 수정 및 상품 등록 버튼이 표시됩니다.
    -   프로필 수정 버튼을 통해 프로필 수정 페이지로 이동할 수 있습니다.
    -   상품 등록 버튼을 통해 상품 등록 페이지로 이동할 수 있습니다.
-   `다른 사용자 계정`을 나타내는 페이지(your_profile.html)
    -   다른 계정의 사용자와 채팅을 할 수 있는 채팅 버튼, 팔로우 할 수 있는 팔로우 버튼, 공유를 할 수 있는 공유 버튼이 표시됩니다.
    -   채팅 버튼을 통해 다른 계정 사용자와 채팅을 할 수 있습니다.
    -   팔로우 버튼은 API를 통해 팔로우 여부에 따라 팔로우 또는 언팔로우 버튼을 나타냅니다.
    -   팔로우 버튼을 통해 팔로우 할 수 있으며 팔로우 api 요청이 완료 될 경우 해당 사용자의 followers와 사용자 계정의 followings의 수가 1 증가시키고 팔로우 버튼을 언팔로우 버튼으로 바꿔줍니다.
        (언팔로우 버튼은 팔로우 버튼과 반대로 동작합니다.)
    -   공유 버튼은 구현되지 않았습니다.

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://user-images.githubusercontent.com/42796944/150986599-d7846eb6-20e2-4a57-8290-5accc9c4b6f9.gif"
            width="300px;"
            alt=""
          /><br/><sub><b>사용자 계정 프로필 화면</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/42796944/151185247-a4d7f176-c605-48bf-859e-fb49a1e7f3df.gif"
            width="300px;"
            alt=""
          /><br /><sub><b>다른 사용자 계정 프로필 화면</b></sub><br />
      </td>
    </tr>
  </table>
</div>

**판매 중인 상품**

-   `상품 등록 페이지를 통해 등록한 상품`들이 나타납니다. 상품이 없을 경우 해당 부분은 화면에 표시되지 않습니다.
-   `사용자 계정`을 나타내는 페이지(my_profile.html)
    -   상품을 클릭하면 등록된 상품에 대한 삭제 및 수정, 상품을 판매하는 링크로 이동하는 버튼을 나타내는 모달이 나타납니다.
    -   삭제 버튼을 통해 삭제 여부를 확인하고 해당 상품을 삭제합니다.
    -   수정 버튼을 통해 상품 수정 페이지로 이동합니다.
    -   판매 링크를 통해 등록했던 상품의 판매 링크를 새 창으로 띄워줍니다.
-   `다른 사용자 계정`을 나타내는 페이지(your_profile.html)
    -   상품을 클릭하면 상품의 판매 링크를 새 창으로 띄워줍니다.

<div align="center">
<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/42796944/151185644-5013d232-0bbc-48ec-ba24-8a6ce70d5deb.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>사용자 계정 프로필 화면</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/42796944/151185403-d75c161b-3418-42ee-b67c-560ab2b6602d.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>다른 사용자 계정 프로필 화면</b></sub><br />
    </td>
  </tr>
</table>
</div>

**게시글**

-   `사용자가 게시물 작성 페이지를 통해 작성한 게시글`들이 나타납니다. 등록한 게시물이 없을 경우 해당 부분은 화면에 표시되지 않습니다.
-   게시물이 표시되는 상단의 `리스트 형 보기` 버튼과 `앨범 형 보기` 버튼을 통해 게시물 보기 방식을 선택할 수 있고 이에 따라 나타나는 화면이 구분됩니다.
-   `리스트 형 보기` 게시물
    -   사용자를 소개하는 부분인 프로필 사진, 사용자 이름, 계정 ID부분을 통해 해당 사용자의 프로필 화면으로 넘어갈 수 있습니다.
    -   게시글 내용으로 게시물 작성에서 작성한 텍스트와 첨부한 사진(최대 3장)이 있다면 사진이 함께 나타나며 사진이 여러 장일 경우 사진 간 슬라이드를 통해 움직일 수 있습니다.
    -   좋아요 버튼을 통해 게시글의 좋아요 수와 내 좋아요 표시 여부를 확인할 수 있고 버튼을 통해 좋아요를 표시하고 해제할 수 있습니다.
    -   댓글 버튼을 통해 게시글에 달린 댓글의 수를 확인할 수 있고 버튼을 통해 해당 게시글의 상세 페이지로 이동할 수 있습니다.
    -   더보기 버튼을 통하여 `사용자 계정`일 경우 게시글 삭제 및 수정을 수행할 수 있습니다. `다르 사용자 계정`일 경우 게시글을 신고할 수 있습니다.
-   `앨범 형 보기` 게시물
    -   사진이 있는 게시글에 한하여 게시글이 앨범형으로 나타납니다.
    -   앨범형 게시글을 클릭할 경우 게시글 상세 페이지로 이동합니다.
    -   등록된 사진이 1장일 경우 단일 이미지만 표시됩니다.
    -   등록된 사진이 여러 장일 경우 제일 첫 번째 이미지만 표시되며 게시글의 우측 상단에 여러 장 등록된 게시글이라는 표시가 나타납니다.

<div align="center">
<table>
  <tr>
    <td align="center">
        <img
          src="https://user-images.githubusercontent.com/42796944/151185758-eb08692c-6e92-487e-aae5-82ee48a45fc9.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>사용자 계정 프로필 화면</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://user-images.githubusercontent.com/42796944/151185765-2e732ff6-ca33-42e6-a82e-36ac930d84f2.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>다른 사용자 계정 프로필 화면</b></sub><br />
    </td>
  </tr>
</table>
</div>

<h2>💧 팔로워, 팔로잉 목록 (이우성)</h2>

-   사용자 프로필 페이지에서 프로필의 팔로워 및 팔로잉을 클릭하면 나타나는 페이지로 팔로우 또는 팔로잉하는 사용자의 목록을 표시해 줍니다.
-   사용자 목록에 있는 사용자를 클릭하면 해당 사용자의 프로필 페이지로 이동합니다.
-   각 사용자에 대해 사용자 프로필 사진, 이름, 사용자 소개가 표시되고 해당 사용자에 대한 팔로우 여부에 따라 목록 우측에 팔로우 또는 취소 버튼이 나타납니다.
-   팔로우 또는 취소 버튼을 통해 해당 사용자를 팔로우 하거나 팔로우 취소할 수 있습니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/42796944/151186017-8e3d80ac-60bb-4e32-8a54-a516a8fe1e1c.gif">
</kbd>
</p>

<h2>💧 채팅 목록 및 채팅방 (이우성)</h2>

-   채팅 목록 및 채팅 방은 서버를 통해 통신하지 않고 ui상으로만 동작합니다.
-   채팅 목록에 있는 채팅방을 클릭하면 해당 유저의 이름을 방이름으로 가지는 채팅방 화면이 나타납니다.
-   채팅을 입력하면 전송 버튼이 활성화 됩니다.
-   전송 및 사진 기능은 구현되지 않았습니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://user-images.githubusercontent.com/42796944/151186215-90433837-154e-441d-91c6-ab8c4a21ef8a.gif">
</kbd>
</p>

---

<h2>💧프로필 수정 페이지(김채운)</h2>

-   my profile 페이지에서 프로필수정 버튼을 클릭하면 프로필 수정 페이지로 넘어갑니다.
-   프로필 수정 유효성 검사
    -   사용자 이름은 2~10자 이내여야 하고 그렇지 않을경우 경고문을 띄워줍니다.
    -   계정 ID는 영문, 숫자, 특수문자(.),(\_)만 가능하고 그렇지 않을경우 경고문을 띄워줍니다.
-   버튼 활성화
    -   모든 입력을 마치면 버튼이 활성화 됩니다.
    -   하나의 창이라도 비면 버튼이 비활성화 됩니다.
-   수정을 완료하고 저장 버튼을 클릭하면 my profile 페이지에서 프로필이 수정된 걸 확인 할 수 있습니다.

<div align="center">
<table>
  <tr>
    <td align="center">
        <img
          src="https://images.velog.io/images/codns1223/post/335897f6-8e8e-46ca-acc8-aa4b6b8cfa84/profile_modification.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>사용자 이름 유효성</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://images.velog.io/images/codns1223/post/bcd4e54b-bc57-4731-91b5-3b60340208b6/profile_modification2.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>계정ID유효성</b></sub><br />
    </td>
  </tr>
</table>
</div>

<h2>💧게시물 업로드 페이지(김채운)</h2>

-   하단메뉴에서 게시물작성을 클릭하면 게시물작성 페이지로 넘어갑니다.
-   텍스트를 입력하면 업로드 버튼이 활성화 됩니다.
-   이미지는 3장까지 첨부 가능 합니다.
-   첨부할 이미지 미리보기에서 x 버튼을 클릭하면 이미지가 사라집니다.
-   업로드 버튼을 누르면 my profile 페이지로 넘어갑니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://images.velog.io/images/codns1223/post/02e313f5-eaec-4b5a-b041-3e908866a28b/post-upload.gif">
</kbd>
</p>

-   이미지는 3장까지 첨부 가능 합니다.
-   3장 이상을 업로드 하려고 하면 경고창이 뜹니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://images.velog.io/images/codns1223/post/f315eade-17e9-448f-b5c0-2236899b87ba/post-upload2.gif">
</kbd>
</p>

<h2>💧게시물 상세 페이지(김채운)</h2>
</br>

-   이미지가 2 or 3장일 경우에
-   하트 아이콘을 클릭하면 좋아요 기능이 활성화 됩니다.
-   하트 아이콘을 다시 클릭하면 좋아요가 취소 됩니다.

<h3>다른 user 게시글</h3>

-   Home 피드에서 댓글 아이콘을 클릭하면 게시물 상세보기 페이지로 넘어갑니다.
-   다른 user가 작성한 게시물일 경우 게시물 더보기 버튼을 클릭하면 신고하기 모달창이 뜹니다.
-   ‘취소’ 버튼을 클릭하면 모달창이 사라진다.

<h3>본인 게시글</h3>

-   하단 메뉴의 프로필을 눌러 프로필 페이지로 이동해서 댓글 아이콘을 누르면 본인 게시물 상세페이지로 이동이 가능하다.
-   본인 게시물일 경우 게시물 더보기 버튼을 클릭하면 ‘삭제, 수정’ 모달창이 뜬다.
-   본인 게시물에서 ‘삭제’ 버튼을 클릭하면 게시물이 삭제되고,
-   ‘수정’ 버튼을 클릭하면 게시물 수정 페이지로 넘어갑니다.
-   ‘취소’ 버튼을 클릭하면 모달창이 사라진다.

<div align="center">
<table>
  <tr>
    <td align="center">
        <img
          src="https://images.velog.io/images/codns1223/post/ae514def-5ae9-478d-9fa3-c26d2414b011/post.gif"
          width="300px;"
          alt=""
        /><br/><sub><b>다른 user 게시글</b></sub><br />
    </td>
     <td align="center">
        <img
          src="https://images.velog.io/images/codns1223/post/3fa8a3b7-24f0-4546-b097-376e4abacc0d/post2.gif"
          width="300px;"
          alt=""
        /><br /><sub><b>본인 게시물</b></sub><br />
    </td>
  </tr>
</table>
</div>

<h3>댓글</h3>

-   댓글 입력창에서 댓글을 입력하면 ‘게시’ 버튼이 활성화 됩니다.
-   댓글을 입력하고 ‘게시’ 버튼을 누르면 댓글이 업로드 됩니다.
-   댓글이 업로드 되면 업로드된 시간이 뜹니다.
-   댓글도 마찬가지로 더보기 버튼을 클릭했을시, 본인이면 ‘삭제’ 다른 user면 ‘신고하기’ 모달창이 뜹니다.
-   본인이면 삭제를 눌렀을시 댓글 삭제가 가능 합니다.

<p align="center">
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://images.velog.io/images/codns1223/post/6c692e59-0545-43f2-a1a4-98358921ec70/post-comment2.gif">
</kbd>
</p>

<h2>💧게시물 수정 페이지(김채운)</h2>
</br>

-   수정해야될 정보를 불러와서 화면에 그려줍니다.
-   게시물 업로드 페이지와 동일하게 이미지는 3장까지 첨부 가능 합니다.
-   수정이 완료되면 my profile 페이지로 넘어갑니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://images.velog.io/images/codns1223/post/91811e58-423d-4fb4-999c-a71378894dc8/post-modi.gif"><br/><sub><b>이미지 3장 이상일때</b></sub><br />
</kbd>
</p>

<h2>💧상품 업로드 페이지(김채운)</h2>
</br>

-   my profile 페이지에서 상품등록 버튼을 클릭하면 상품 업로드 페이지로 넘어갑니다.
-   유효성 검사
    -   상품명은 2~15자 이내여야 하고 그렇지 않을경우 밑에 경고문이 뜹니다.
    -   가격은 숫자만 입력 가능하고 그렇지 않을경우 경고문이 뜹니다.
-   가격은 입력하면 자동으로 원단위(,)로 변환해줍니다.
-   판매링크까지 전부 작성완료 하면 저장 버튼이 활성화 됩니다.
-   저장 버튼을 누르면 my profile페이지에 상품등록이 완료된 걸 확인할 수 있습니다.

<p align="center" >
<kbd>
<img width="300px" style = "border : 1px solid" src= "https://images.velog.io/images/codns1223/post/183aa986-f6ed-49f6-8503-8f2d2fbd7398/add-product.gif">
</kbd>
</p>
