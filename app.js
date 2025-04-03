const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// router와 연결해 주기
const indexRouter = require('./routes/index');

// body-parser : http 리퀘스트에 있는 payload 값을 req.body에 넣어줌
const app = express();
app.use(bodyParser.json());
app.use('/api', indexRouter); // /api/tasks get 모 이런 식으로 ~~ 한 번 더 붙는 거임
// /api라는 주소로 호출이 오면 index로 간다 ~!!
// '/api' >> 써도 되고 안 써도 되고

// mongoose 세팅
const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log('DB connection fail', err);
  });
//   catch는 멀까요 try catch의 그 캐치라고 생각하셔요

app.listen(5000, () => {
  console.log('server is on 5000');
});
