const productsController = require('../controllers/productsController');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/get-all', productsController.getAllProduct);
router.get('/get-by-user/:userId', productsController.getProductByUser);
router.post('/transfer', productsController.transferAmount);

module.exports = router;
