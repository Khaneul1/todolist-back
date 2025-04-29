const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();

// router.post('/', (req, res) => {
//   res.send('create task');
// });

// authController에서 authenticate를 먼저 검사하고 넘어간다
router.post('/', authController.authenticate, taskController.createTask);

// router.get('/', (req, res) => {
//   res.send('get tasks');
// });
router.get('/', taskController.getTask);

// router.put('/:id', (req, res) => {
//   res.send('update task');
// });
router.put('/:id', taskController.updateTask);

// router.delete('/:id', (req, res) => {
//   res.send('delete task');
// });
router.delete('/:id', taskController.DelTask);

module.exports = router;
// 내보내야 쓸 수 있으니까 export 해 줄 것~!!!
// /tasks 너무 ~~~ 자주 언급되니까 이걸 하나로 묶어주는 작업을 합쉬다
// >> task.api.js
