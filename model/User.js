// Task.js에서 했던 거랑 똑같이!!
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
// 스키마는 작업지시서 같은 것!!
// 이를 바탕으로 실제 모델을 만들어 줘야 함

const User = mongoose.model('User', userSchema);
module.exports = User;
