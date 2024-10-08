const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth')
const controller = require('./controller')

router.get('/transactions', auth, controller.getTranscationList);
router.get('/transactions/:id', auth, controller.detailTransactionList);

module.exports = router; 
