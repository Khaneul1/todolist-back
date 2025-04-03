const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('create task');
});

router.get('/', (req, res) => {
  res.send('get tasks');
});

router.put('/:id', (req, res) => {
  res.send('update task');
});

router.delete('/:id', (req, res) => {
  res.send('delete task');
});

module.exports = router;
// 내보내야 쓸 수 있으니까 export 해 줄 것~!!!
// /tasks 너무 ~~~ 자주 언급되니까 이걸 하나로 묶어주는 작업을 합쉬다
// >> task.api.js
