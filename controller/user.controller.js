const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
  try {
    //   email, name, password 값을 받을 건데 이 값들은 request body에서 온다
    const { email, name, password } = req.body;

    // email, name, password 중 하나라도 비어 있으면 오류 메시지 출력
    if (!email || !name || !password) {
      return res.status(400).json({
        status: 'fail',
        error: '이메일, 이름, 비밀번호는 필수 항목입니다.',
      });
    }

    //   이미 가입된 유저 있는지 체크
    //   user 모델에서 email이 req.body에서 받은 email과 같은 사람을 한 명 찾아라
    const user = await User.findOne({ email: email });
    //   const user = await User.findOne({ email }); 이렇게 줄일 수 있음

    // 만약 ~~ req.body에서 받은 이메일과 같은 사용자가 있다면 에러 메시지 출력
    if (user) {
      // throw new Error('이미 가입이 된 사용자입니다.');
      return res.status(400).json({
        status: 'fail',
        error: '이미 가입된 사용자입니다.',
      });
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
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    // 2. 이메일 패스워드 정보 읽어오기
    const { email, password } = req.body;
    // 3. 이메일을 가지고 유저 정보 가져오기
    const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
    if (user) {
      // 만약 유저가 있다면 ~~
      // 4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
      // 프론트엔드에서 온 패스워드 -> 유저가 입력한 그 자체
      // DB에 있는 user.password -> 암호화된 패스워드
      // 이 2개를 어케 비교할까용?
      // to check a password 확인!! hash 말고도 compareSync 통해 비교 가능
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        // 5. 맞다! 그러면 토큰 발행
        // token 발행하는 라이브러리 사용 (npm json web token)
        // 토큰 발행할 때 매개변수 2개 필요
        // 토큰을 발행할 때 쓰일 유저 정보(id 등), 비밀스러운 키(토큰 암호화 : 아무나 토큰을 가져다 쓰면 안 되니까~~)
        const token = user.generateToken();
        // 7. 응답으로 유저 정보 + 토큰 보냄
        return res.status(200).json({ status: 'success', user, token });
      }
    }
    throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    // 6. 틀리면 에러메시지 보냄
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
// 이 함수 user.api.js에서 사용

module.exports = userController;
