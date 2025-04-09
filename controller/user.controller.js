const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
  try {
    //   email, name, password 값을 받을 건데 이 값들은 request body에서 온다
    const { email, name, password } = req.body;
    //   이미 가입된 유저 있는지 체크
    //   user 모델에서 email이 req.body에서 받은 email과 같은 사람을 한 명 찾아라
    const user = await User.findOne({ email: email });
    //   const user = await User.findOne({ email }); 이렇게 줄일 수 있음

    // 만약 ~~ req.body에서 받은 이메일과 같은 사용자가 있다면 에러 메시지 출력
    if (user) {
      throw new Error('이미 가입이 된 사용자입니다.');
    }

    // 비밀번호 암호화 코드 추가!!
    const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt); 내 패스워드 값 넣기!
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: 'success' });

    //   패스워드 암호화 라이브러리(npm library) : bcrypt
    //   npm install bcrypt
    //   const bcrypt = require('bcrypt') 이런 식으로 임포트 해 주면 되고
    //   saltRounds : 암호화를 몇 번 시킬지 말하는 것!!
    //   >> 암호화를 너무 많이 시키면 보안에는 좋지만 시간이 오래 걸려서 마냥 좋다고 할 수 없음
    //   암호화 한 번만 시키면 쉽게 해석이 되기 때문에 ~~..
    //   bcrypt에서 추천하는 횟수는 10번!!
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};
module.exports = userController;
