// 권한 관리 관련 내용은 전부 여기에 넣기
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authController = {};
require('dotenv').config();

authController.authenticate = (req, res, next) => {
  try {
    // 토큰을 헤더의 authorization에 붙임!! Bearer + space와 함께
    const tokenString = req.headers.authorization; //여기의 토큰값은 Bearer a;sld
    // login-fe LoginPage에 토큰값을 Bearer + space 와 함께 붙여준다고 코드 적어놨음
    if (!tokenString) {
      throw new Error('invalid token');
    }
    // 토큰값만 똑 가져오기~~
    const token = tokenString.replace('Bearer ', ''); //Bearer 를 빈 문자열로 대체

    // verify : 마지막에 콜백 함수 받음
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        //   에러가 있다면 아래의 문자열 던짐
        throw new Error('invalid token');
      }
      // res.status(200).json({stats:"success", userId: payload._id})
      req.userId = payload._id; //request에 임의로 붙여서 데이터 보내주는 것
    });
    next(); // 다음 게 뭔지 어케 알죠? >> user.api.js에서 지정해 줌
  } catch (error) {
    //에러 핸들링
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

module.exports = authController;

// 미들웨어
// next : 나 끝나면 다음 거 불러
