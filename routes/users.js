const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const handleErrorAsync = require('../services/handleErrorAsync');

// 取得所有使用者
router.get('/users', handleErrorAsync(UsersController.getUsers));
// 新增單筆使用者
router.post('/user', handleErrorAsync(UsersController.createUser));
// 刪除所有使用者
router.delete('/users', handleErrorAsync(UsersController.deleteUsers));
// 刪除單筆使用者
router.delete('/user/:id', handleErrorAsync(UsersController.deleteUserById));
// 修改單筆使用者
router.patch('/user/:id', handleErrorAsync(UsersController.updateUserById));

module.exports = router;
