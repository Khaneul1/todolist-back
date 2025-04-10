require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// router와 연결해 주기
const indexRouter = require('./routes/index');

// body-parser : http 리퀘스트에 있는 payload 값을 req.body에 넣어줌
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter); // /api/tasks get 모 이런 식으로 ~~ 한 번 더 붙는 거임
// /api라는 주소로 호출이 오면 index로 간다 ~!!
// '/api' >> 써도 되고 안 써도 되고

// mongoose 세팅
// .env 파일을 만들어서 데이터 연결을 했어요 ~~
// 그럼 이걸 읽을 만한 .env의 변수를 읽으려면 노드.js에서 따로 설치해 줘야 됨
// npm install dotenv
// dot env 패키지로 들어가면 어케 쓰는지 나와있음!!
const mongoURI = MONGODB_URI_PROD;

// 터미널에서 useNewUrlParser 관련 경고 문구가 뜨는 이유
// 몽고디비 드라이버가 v4 이상이면 기본값으로 적용되기 때문에 굳이 명시될 필요가 없어서!!
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log('DB connection fail', err);
  });
//   catch는 멀까요 try catch의 그 캐치라고 생각하셔요

app.listen(process.env.PORT || 5000, () => {
  console.log('server is on 5000');
});

// 1. 회원가입
// 유저가 이메일, 패스워드, 유저 이름 입력해서 보냄
// 받은 정보를 저장함 (데이터베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장해야 함!! 개발자가 봐도 모를 정도로
// 암호화를 도와주는 라이브러리 사용 ~~

// (1) 라우터 지정 -> index.js와 user.api.js 통해 완료
// (2) 모델 -> model > user.js 통해 생성 완료
// (3) 데이터를 저장 (이미 가입된 유저 유무, 패스워드 암호화)
// (4) 응답을 보낸다

// 2. 로그인
// 이메일 패스워드 유저가 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패 메시지 보내기
// 있다면? > 유저 정보 + 토큰 보내기
// 한 번 로그인하면 오랫동안 유지되는 것!! == 토큰
// 프론트엔드에서는 이 정보를 저장
