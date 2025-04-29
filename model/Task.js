const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      // 1. 테이블(컬렉션)의 컬럼을 추가한다 author
      // 몽구스 스키마에서 Types.ObjectId라는 것을 제공해 줌
      // id만 받아올 것이라고 타입 지정해 주기
      // ref(참조) User라는 모델에서 id 값을 받아올 것
      author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
  },
  { timestamps: true } //이게 있으면 createAt과 updateAt이 생김
  //   데이터 생성 시간 찍힘
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// 이제 기능을 만들어 줘야 돼여 ~~
// 따로 폴더 만들 거야 controller
