const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

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

// 補捉系統錯誤 (只在開發環境顯示詳細錯誤，生產模式顯示簡易錯誤)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const localError = req.app.get('env') === 'development' ? err : {};

  res.status(err.statusCode || 500).json({
    status: false,
    message: err.message,
    error: localError,
  });
});
module.exports = app;
