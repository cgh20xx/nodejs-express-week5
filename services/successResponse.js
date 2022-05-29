const successResponse = (res, data) => {
  res.status(200).json({
    status: true,
    data,
  });
};
module.exports = successResponse;
