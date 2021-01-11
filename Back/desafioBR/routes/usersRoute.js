const express = require('express');
const { Router } = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create', userController.createUser);
router.get('/get-all', userController.getUser);
router.get('/getuser/:userId', userController.getUserById);
router.put('/update/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
