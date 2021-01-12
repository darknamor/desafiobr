const transfer = require('../models/Transfers');
const errorResponse = require('../helper/errorResponse');
const getOwnerUser = require('./productsController');

const makeTransfer = async (request, response, next) => {
  try {
    const { rut, monto, fecha, destino, tipo } = request.body;
    const isValid = await getOwnerUser.checkValidAndTransfer(rut, monto, destino);
    if (isValid !== false) {
      await transfer.create({
        monto,
        fecha,
        destino,
        tipo,
        user: isValid,
      });
      response.send({ status: 'OK', message: 'SUCCESSFUL TRANSFER' });
    } else {
      next(new errorResponse('INSUFFICIENT BALANCE OR THE DESTINATION ACCOUNT DOES NOT EXIST', 404));
    }
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};

const makeMovement = async (request, response, next) => {
  try {
    const { rut, monto, fecha, destino, tipo } = request.body;
    const isValid = await getOwnerUser.checkValidAndMovement(rut, monto, destino);
    if (isValid !== false) {
      await transfer.create({
        monto,
        fecha,
        destino,
        tipo,
        user: isValid,
      });
      response.send({ status: 'OK', message: 'SUCCESSFUL TRANSFER' });
    } else {
      next(new errorResponse('INSUFFICIENT BALANCE OR THE DESTINATION ACCOUNT DOES NOT EXIST', 404));
    }
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};

const getTransferById = async (request, response, next) => {
  try {
    const data = await transfer.find({ user: request.params.userId }).select({ monto: 1, fecha: 1, destino: 1, tipo: 1, _id: 0 });
    if (!data) {
      return next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
    }
    response.status(200).json(data);
  } catch (error) {
    next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
  }
};
module.exports = {
  makeTransfer,
  getTransferById,
  makeMovement
};
