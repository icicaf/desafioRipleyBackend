const express = require('express');
const { Router } = require('express');

const customersController = require('../controllers/customersController');
const router = express.Router();

router.post('/',customersController.login);
router.post('/register',customersController.register);

module.exports = router;