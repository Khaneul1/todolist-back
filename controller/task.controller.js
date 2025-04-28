const Task = require('../model/Task');
const taskController = {};

// 여기에 기능을 하나하나 정의해 줄 거임
// 1) 할 일 추가 >> 할 일 추가 주소를 호출하는 곳에서 쓰임
taskController.createTask = async (req, res) => {
  try {
    // req = 프론트엔드가 보낸 데이터
    // res = 프론트엔드에게 보낼 데이터
    // task를 만드려면 어떤 정보가 있어야 할까
    // task, isComplete 이란 데이터가 있어야 task를 만들 수 있음!!
    // 이 2개의 데이터는 프론트엔드에서 오잖아요 ? >> req
    // request의 body에!! 데이터가 있음!! >> body parser 다운받은 이유
    // request는 항상 head / body로 구성되어 있음
    // head : 인증정보, 문서 형식 정보 등이 있음
    // body : 프론트엔드에서 보내는 값들

    // task랑 isComplete이란 데이터를 불러올 건데 이건 request body에서 온다~
    const { task, isComplete } = req.body;
    const { userId } = req;
    // 새로운 task 하나 만들어 줌 !! task라는 모델을 불러와서
    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();

    // 저장했다는 걸 알려 줘야 함! 응답값 줘야지요
    // 성공하면 200번대 보내고 json으로 데이터를 보낼게 ~~
    res.status(200).json({ status: 'success', data: newTask });
  } catch (err) {
    // 에러 핸들링도 해야 하니까 ~~
    res.status(400).json({ status: 'fail', error: err });
  }
};

// 할 일 리스트 읽어와서 보여 주기
taskController.getTask = async (req, res) => {
  try {
    // Task 모델에서 모든 리스트를 달라는 말
    //   근데 __v 데이터는 빼 줘 ~~ .select 활용할 것
    // populate : 다른 컬렉션에 있는 참조된 데이터를 가지고 온다 (join)
    const taskList = await Task.find({}).populate('author');
    console.log('tttt', taskList);

    res.status(200).json({ status: 'success', data: taskList });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

// id는... 어떻게 넣지요?
// 끝남 안 끝남 알려주는 것
taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isComplete },
      { new: true }
    );
    res.status(200).json({ status: 'success', data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

// 할 일 삭제 기능
taskController.DelTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ status: 'success', data: deleteTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = taskController;

// 프론트 > 백으로 요청을 보낼 때 이 요청은 크게 header와 body로 나뉨
// HTML에서 헤더와 바디가 나뉘는 것과 비슷한 느낌!!
// 헤더 : 문서의 타입, http 명령어 호출 정보, 어디로 가고 어디서 요청을 한 건지, 요청시간, body 정보, 인증토큰 정보
// 바디 : 프론트에서 백엔드로 내가 보내고 싶은 데이터를 보내면 됨

// 모든 요청이 body가 있는 건 아님!!
// get의 경우 읽어오기 전용이기 때문에 body가 없음
// get과 함께 어떤 데이터를 보내고 싶다면 쿼리를 이용해야 함
// 만약 대량의 데이터를 보내야 할 경우에는 get을 써야 하는 상황에서도 post를 사용하곤 함
