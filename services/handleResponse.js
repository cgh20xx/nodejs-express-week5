const successResponse = (res, data) => {
  res.status(200).json({
    status: true,
    data,
  });
};

const errorResponse = (res, err) => {
  res.status(400).json({
    status: false,
    message: err.message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
