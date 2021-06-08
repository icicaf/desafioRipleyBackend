const express = require('express');
const { Router } = require('express');

const banksController = require('../controllers/bankController');
const router = express.Router();

router.get('/',banksController.getAll);

module.exports = router;