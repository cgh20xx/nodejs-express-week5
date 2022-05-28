const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

// 取得所有使用者
router.get('/users', UsersController.getUsers);
// 新增單筆使用者
router.post('/user', UsersController.createUser);
// 刪除所有使用者
router.delete('/users', UsersController.deleteUsers);
// 刪除單筆使用者
router.delete('/user/:id', UsersController.deleteUserById);
// 修改單筆使用者
router.patch('/user/:id', UsersController.updateUserById);

module.exports = router;
