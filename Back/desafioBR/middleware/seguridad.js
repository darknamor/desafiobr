const ErrorResponse = require('../helper/errorResponse');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Users');

exports.seguridad = async (request, response, next) => {
  let token;

  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('TOKEN NOT FOUND', 404));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rutDB = await Usuario.findOne({ rut: decoded.rut });
    request.rut = rutDB;
    next();
  } catch (error) {
    return next(new ErrorResponse('ERROR IN PROCCESS TOKEN', 400));
  }
};
