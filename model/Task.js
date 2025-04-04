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
    },
  },
  { timestamps: true }
  //   데이터 생성 시간 찍힘
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// 이제 기능을 만들어 줘야 돼여 ~~
// 따로 폴더 만들 거야 controller
