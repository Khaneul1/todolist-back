// 파일 하나로 합쳐도 되긴 하지만
// 큰~~ 프로젝트를 개발하게 되면 api가 을마나 많이 필요해
// 그래서 코드를 목적에 따라 정리하는 습관을 들여야 함!!
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
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

// 토큰 통해 유저 id 빼내고 -> 그 아이디로 유저 객체 찾아서 보내주기
// 하나의 함수 말고 원하는 만큼 여러 개의 함수가 들어갈 수 있음
router.get('/me', authController.authenticate, userController.getUser); //로그인한 나의 정보를 가지고 오는 거니까 직관적으로 me로 설정
// 해당 url 성공하면 authenticate로 가고, next() 호출 시 다음 파라미터인 getUser로 가라는 의미

module.exports = router;

// (1) 로그인을 했다면, 로그인 페이지로 돌아갈 수 없음
// 0. 로그인을 했으면 토큰을 저장함
// 1. 토큰값 읽어옴
// 2. 토큰이 사용 가능한 토큰인지 체크 (토큰이 만료되지 않고, 토큰을 해독했을 때 유저 ID가 있다 -> 백엔드)
// 2-1. 토큰이 사용 가능하면, 토큰을 바탕으로 유저 객체를 보내줌
// 3. 유저 값을 저장함
// 4. 유저가 있다면 투두 페이지 보여줌

// (2) 로그인 안 했다면 투두페이지로 돌아갈 수 없음
