const express = require('express');
const { Router } = require('express');

const customersController = require('../controllers/customerController');
const router = express.Router();

router.post('/login',customersController.login);
router.post('/register',customersController.register);
router.get('/',customersController.getCustomer);

module.exports = router;