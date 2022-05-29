const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {
  errorResponseDev,
  errorResponseProd,
} = require('./services/errorResponse');
// const { default: axios } = require('axios');

// 捕捉程式紅字錯誤 (如: aaa is not defined)
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

// 捕捉未處理路由
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: '查無此網站路由',
  });
});

// 錯誤處理：捕捉 next() 中的 Error
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // dev 環境顯示詳細錯誤訊息
  if (process.env.NODE_ENV === 'dev') {
    return errorResponseDev(err, res);
  }
  // 以下為 production 環境顯示簡單的錯誤訊息
  // 之後套件用的越多，會需要在這裡各別處理套件的錯誤訊息

  // 客製化 mongoose 套件驗証錯誤
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確，請重新輸入！'; // 故意不顯示 mongoose 的 message
    err.isOperational = true;
    return errorResponseProd(err, res);
  }
  // 客製化 A 套件驗証錯誤
  // ...
  // 客製化 B 套件驗証錯誤
  // ...

  errorResponseProd(err, res);
});

// 未捕捉到的 Error  (如：使用了 Axios 有用 .then 但未 .catch)
// 若沒偵聽 unhandledRejection 還是會被 uncaughtException 捕捉到
// Node 16.x Doc:https://nodejs.org/docs/latest-v16.x/api/process.html#event-unhandledrejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('未處理的 rejection：', promise); // The rejected promise.
  console.error('原因：', reason); // The object with which the promise was rejected (typically an Error object).
  // 記錄於 log 上
  process.exit(1);
});

module.exports = app;
