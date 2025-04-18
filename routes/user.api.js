// 파일 하나로 합쳐도 되긴 하지만
// 큰~~ 프로젝트를 개발하게 되면 api가 을마나 많이 필요해
// 그래서 코드를 목적에 따라 정리하는 습관을 들여야 함!!
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 1. 회원가입 endpoint 만들어 주기
// 회원가입의 http 명령어가 post인 이유!!
// 새로운 유저 정보를 생성하는 것이기 때문에 create user에 가까움
// 그래서 새로 생성하는 post를 사용해야 함

// 이미 index.js에 /user를 지정해 줬기 때문에
// user.post 하면 create user가 됨
// /user post => create user

// router.post('/', (req, res) => {
//   res.send('create user controller will be here');
// }); << 임의로 넣은 값이어요~

router.post('/', userController.createUser);

// 1. 라우터 설정 >> routes/user.api.js
// 로그인 라우터 설정 (post 사용)
// 이메일과 패스워드를 읽어와야 하기 때문에 post 사용
// get : 추가적인 정보를 req.body에 담아서 보낼 수 없음
// post는 req.body 사용할 수 있어서 post 사용함!!
// url로 보내면 get도 사용 가능하지만 이메일/패스워드는 드러나면 안 되는 정보라서 안 됨
router.post('/login', userController.loginWithEmail);

module.exports = router;
