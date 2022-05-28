const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { default: axios } = require('axios');

// 補捉程式紅字錯誤 (如: aaa is not defined)
process.on('uncaughtException', (err) => {
  // 記錄錯誤下來(未來可找戰犯)，等到服務都處理完後，停掉該 process
  console.error('Uncaughted Exception！');
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack); // node.js 專有的 stack (不該出現在 production)
  process.exit(1);
});

// 1. 連接資料庫
require('./connections');

// 2. 建立路由
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/meta', postsRouter);
app.use('/api/meta', usersRouter);

// 補捉未處理路由
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: '查無此網站路由',
  });
});

// 補捉 express middleware 或 router 的 next() 中的 new Error()
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const localError = req.app.get('env') === 'development' ? err : {};

  res.status(err.statusCode || 500).json({
    status: false,
    message: err.message,
    error: localError,
  });
});

// 未捕捉到的 catch  (如：使用了 Axios 有用 .then 但未 .catch)
// 若沒偵聽 unhandledRejection 還是會被 uncaughtException 補捉到
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise);
  console.error('原因：', reason);
  // 記錄於 log 上
});

// axios.get('http://sjoisejfsef213s.com')

module.exports = app;
