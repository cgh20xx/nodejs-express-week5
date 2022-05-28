// 重新包裝 Error 再用 next 傳給 express 內建的錯誤處理
const appError = (httpStatus, errMessage, next) => {
  const error = new Error(errMessage);
  error.statusCode = httpStatus; // 自訂 statusCode
  error.isOperational = true; // 自訂 isOperational (是否人為操作錯誤?)
  next(error); // next 第一個參數是 Error 的話，會導向 app.use(function (err, req, res, next) {])
};

module.exports = appError;
