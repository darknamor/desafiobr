const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/Users');
const newProduct = require('./productsController');

const expiresIn = 60 * 10;
const errorResponse = require('../helper/errorResponse');

const login = async (request, response, next) => {
  try {
    const { rut, password } = request.body;
    const user = await users.findOne({ rut });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      console.log('isOk', isOk);
      if (isOk) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });
        response.status(200).send({ status: 'OK',  userId: user._id, rut, token, expiresIn  });
      } else {
        next(new errorResponse('INVALID PASSWORD', 404));
      }
    } else {
      next(new errorResponse('USER NOT FOUND', 404));
    }
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};

const createUser = async (request, response, next) => {
  try {
    const { username, rut, email, password } = request.body;
    const hash = await bcrypt.hash(password, 15);
    await users.create({
      username,
      rut,
      email,
      password: hash,
    });
    const userId = await users.find().sort({ $natural: -1 }).limit(1);
    await newProduct.createProduct(userId);
    response.send({ status: 'OK', message: 'USER CREATED' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      next(new errorResponse('DUPLICATED VALUES', 404));
      return;
    }
    next(new errorResponse('ERROR', 500));
  }
};

const getUser = async (request, response, next) => {
  try {
    const data = await users.find().select({ password: 0, __v: 0 });
    response.send({ status: 'OK', data: data });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};
const getUserById = async (request, response, next) => {
  try {
    const data = await users.findById(request.params.userId).select({ password: 0, __v: 0 });
    if (!data) {
      return next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
    }
    response.send({ status: 'OK', data });
  } catch (error) {
    next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
  }
};
const getUserByRut = async (request, response, next) => {
  try {
    const { rut } = request.params;
    const userId = await users.findOne({ rut }).select({ password: 0, __v: 0, username: 0, rut: 0, email: 0 });
    if (!userId) {
      return next(new errorResponse(request.params + ' NOT FOUND', 404));
    }
    response.send({ status: 'OK', data: userId });
  } catch (error) {
    next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
  }
};
const updateUser = async (request, response, next) => {
  try {
    const user = await users.findByIdAndUpdate(request.params.id, request.body);
    if (!user) {
      next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
      return;
    }
    response.send({ status: 'USER UPDATED', data: user });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};
const deleteUser = async (request, response, next) => {
  try {
    const user = await users.findByIdAndDelete(request.params.id, request.body);
    if (!user) {
      next(new errorResponse(request.params.userId + ' NOT FOUND', 404));
      return;
    }
    response.status(200).json({ status: '200' });
  } catch (error) {
    next(new errorResponse('ERROR', 500));
  }
};

module.exports = {
  login,
  createUser,
  getUser,
  getUserById,
  getUserByRut,
  updateUser,
  deleteUser,
};
