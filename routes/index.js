const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');
const userApi = require('./user.api');

// tasks가 불리면 무조건 taskApi로 가는 걸로 설정
router.use('/tasks', taskApi);
// router.use('/users', userApi); 이외에도 요렇게 묶어줄 수 있겠져?
router.use('/user', userApi);

module.exports = router;
// postman에서 확인
