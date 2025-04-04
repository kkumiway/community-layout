# 🗣️ Talkpot

사용자들이 자유롭게 글을 작성하고, 댓글을 달고, 소통할 수 있는 커뮤니티 웹 서비스입니다.
<br/><br/>

## 📌 주요 기능

- 🔗 로그인 / 회원가입
- ✏️ 게시글 작성 / 수정 / 삭제
- 📄 게시글 목록 조회 / 상세 조회
- 💬 댓글 작성 / 수정 / 삭제
- ❤️ 게시글 좋아요 / 취소
- 👤 회원 정보 수정 / 비밀번호 수정 / 회원 탈퇴
<br/><br/>

## 🧱 기술 스택

| 구분 | 기술 | 
|------|------|
| Frontend | HTML, CSS, JavaScript |
| REST API | JSON 기반 설계 |
| 호환성 | Chrome, Firefox, Safari |    

  <br/><br/>

## 🔗 폴더 구조

```
📂 community-page
 ├── 📂 assets         # 이미지, 아이콘 파일 저장
 │    ├── profile-placeholder.png
 ├── 📂 components     # 재사용 가능한 컴포넌트
 │    ├── header.html
 ├── 📂 layout
 │    ├── layout.js
 ├── 📂 pages          # 실제 HTML 페이지
 │    ├── edit_password.html
 │    ├── edit_post.html
 │    ├── edit_profile.html
 │    ├── login.html
 │    ├── make_post.html
 │    ├── post.html
 │    ├── posts.html
 │    ├── signup.html
 ├── 📂 styles         # CSS 파일 저장
 │    ├── edit_password.css
 │    ├── edit_post.css
 │    ├── edit_profile.css
 │    ├── login.css
 │    ├── make_post.css
 │    ├── post.css
 │    ├── posts.css
 │    ├── signup.css
 ├── 📂 scripts        # JS 파일 저장
 │    ├── edit_password.js
 │    ├── edit_post.js
 │    ├── edit_profile.js
 │    ├── login.js
 │    ├── make_post.js
 │    ├── post.js
 │    ├── posts.js
 │    ├── signup.js
 └─ 📜 README.md
```  
<br/><br/>

## 🔭 REST API 설계

[👉🏻 스프레드시트 페이지로 이동](https://docs.google.com/spreadsheets/d/19IezY9KrBywdCIKKGkPRzmGNrMLHdYK-HgXVHNEyB4E/edit?gid=1878554884#gid=1878554884)
<br/><br/>

## 📽️ 커뮤니티 레이아웃 미리보기

[👉🏻 노션 페이지로 이동](https://incongruous-soil-3de.notion.site/1c161094f689805584bbdd74c9233eab?pvs=4)
<br/><br/>

## 🧪 실행 방법

1. GitHub에서 클론

```bash
git clone https://github.com/kkumiway/community-page.git
```

2. Live Server 또는 브라우저에서 login.html 열기  