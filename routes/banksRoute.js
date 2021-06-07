const express = require('express');
const { Router } = require('express');

const banksController = require('../controllers/banksController');
const router = express.Router();

router.get('/',banksController.getAll);

module.exports = router;