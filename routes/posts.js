const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts');

// 取得所有貼文
router.get('/posts', PostsController.getPosts);
// 新增單筆貼文
router.post('/post', PostsController.createPost);
// 刪除所有貼文
router.delete('/posts', PostsController.deletePosts);
// 刪除單筆貼文
router.delete('/post/:id', PostsController.deletePostById);
// 修改單筆貼文
router.patch('/post/:id', PostsController.updatePostById);

module.exports = router;
