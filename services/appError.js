// 重新包裝 Error 再用 next 傳給 express 內建的錯誤處理
class AppError extends Error {
  constructor({ statusCode, message, fileName, lineNumber }) {
    super(message, fileName, lineNumber);
    this.statusCode = statusCode; // 自訂 statusCode
    this.isOperational = true; // 自訂 isOperational (是否人為操作錯誤?)
  }
}
module.exports = AppError;
