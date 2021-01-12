const product = require('../models/Products');
const users = require('../models/Users');

const createProduct = async (userId) => {
  try {
    const id = userId[0]._id;
    await product.create({
      user: id,
    });
  } catch (error) {
    response.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const getAllProduct = async (request, response, next) => {
  try {
    const products = await product.find().select('description balance movements').populate('user', 'username rut email');
    response.send({ status: 'OK', data: products });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};
const getProductByUser = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const products = await product.find({ user: userId }).populate('user', 'username rut email');
    response.send({ status: 'OK', data: products });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};
const checkValidAndTransfer = async (rut, monto, destinatario) => {
  try {
    const userId = await users.findOne({ rut }).select({ password: 0, __v: 0, username: 0, rut: 0, email: 0 });
    const products = await product.find({ user: userId._id }).select({ balance: 1, _id: 1 });
    const newAmount = parseInt(products[0].balance) - parseInt(monto);

    const receiverId = await users.findOne({ rut: destinatario }).select({ password: 0, __v: 0, username: 0, rut: 0, email: 0 });
    const receiverProducts = receiverId && (await product.find({ user: receiverId._id }).select({ balance: 1, _id: 1 }));
    const receiverNewAmount = receiverProducts && parseInt(receiverProducts[0].balance) + parseInt(monto);

    if (newAmount < 0 || receiverId === null) {
      return false;
    } else {
      transferAmount(products[0]._id, newAmount);
      transferAmount(receiverProducts[0]._id, receiverNewAmount);
      return userId._id;
    }
  } catch (error) {
    return false;
  }
};
const checkValidAndMovement= async (rut, monto, destinatario) => {
  try {
    const userId = await users.findOne({ rut }).select({ password: 0, __v: 0, username: 0, rut: 0, email: 0 });
    const products = await product.find({ user: userId._id }).select({ balance: 1, _id: 1 });
    const newAmount = parseInt(products[0].balance) + parseInt(monto);

    if (newAmount < 0) {
      return false;
    } else {
      transferAmount(products[0]._id, newAmount);
      return userId._id;
    }
  } catch (error) {
    return false;
  }
};
const transferAmount = async (accountId, balance) => {
  try {
    await product.findByIdAndUpdate(accountId, { balance });
    response.send({ status: 'OK', message: 'TRANSFER SUCCESSFUL' });
  } catch (error) {
    return false;
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductByUser,
  checkValidAndTransfer,
  checkValidAndMovement,
  transferAmount,
};
