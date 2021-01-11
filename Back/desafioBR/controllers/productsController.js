const product = require('../models/Products');

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
const transferAmount = async (request, response, next) => {
  try {
    const { accountId, balance } = request.body;
    //console.log('requ', request.body);
    await product.findByIdAndUpdate(accountId, { balance });
    response.send({ status: 'OK', message: 'TRANSFER SUCCESSFUL' });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductByUser,
  transferAmount,
};
