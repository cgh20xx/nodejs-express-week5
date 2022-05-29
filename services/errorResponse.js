// 顯示開發環境錯誤訊息
const errorResponseDev = (err, res) => {
  // 底線開頭的屬性表只會出現在開發環境
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    _error: err,
    _stack: err.stack,
  });
};
// 顯示生產環境錯誤訊息
const errorResponseProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
  } else {
    // log 紀錄
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: false,
      message: '系統錯誤，請恰系統管理員',
    });
  }
};
module.exports = {
  errorResponseDev,
  errorResponseProd,
};
