// 重新包裝 Error 再用 next 傳給 express 內建的錯誤處理 -> app.use(function (err, req, res, next) {])
const appError = (httpStatus, errMessage, next) => {
  const error = new Error(errMessage);
  error.statusCode = httpStatus; // 自訂 statusCode
  error.isOperational = true; // 自訂 isOperational (是否人為操作錯誤?)
  next(error);
};

module.exports = appError;