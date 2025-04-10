// Task.js에서 했던 거랑 똑같이!!
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 얘는 항상 호출이 돼서 항상 패스워드를 빼고 보여줄 것
userSchema.methods.toJSON = function () {
  // 스키마 전체를 보여줄 필요 없음!! 우리가 필요한 건 _doc에 있음
  const obj = this._doc;
  // password 안 보여 주기 위해서 삭제
  delete obj.password;
  return obj;
};
// 스키마는 작업지시서 같은 것!!
// 이를 바탕으로 실제 모델을 만들어 줘야 함

// 토큰을 발행한다는 건 유저와 관련 있는 기능
// 관련 있는 함수들을 관련 있는 모델과 함께 접목시켜서 정의를 할 수 있음
// 특히 다른 데서도 쓰일 것 같다 그러면 user 모델에 메서드를 정의해 줄 수 있음
// mongoose schema : instance methods 모델에 메서드를 사용할 수 있다고 기재되어 있음
// 필드 중에 메서드를 넣어도 되고, 스키마에 .메서드 해서 함수 정의해도 된다고 기재됨
// generate token 을 하는 기능 여기다 정의!!

// userSchema에 generateToken이라는 메서드를 만들겠다는 의미
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: '1d',
    // 토큰 유통기한 설정해 주는 것
  });
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
