const express = require('express');
const { Router } = require('express');
const transfersController = require('../controllers/transfersController');

const router = express.Router();

router.post('/transfer', transfersController.makeTransfer);
router.post('/movement', transfersController.makeMovement);
router.get('/get-transfers/:userId', transfersController.getTransferById);
module.exports = router;
