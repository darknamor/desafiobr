const errorHandler = (error, request, response, next) => {
  console.log(error, error);
  response.status(500).json({
    status: 500,
    error: error.message,
  });
};

module.exports = errorHandler;
