const express = require('express');
const { Router } = require('express');

const transfersController = require('../controllers/transfersController');
const router = express.Router();

router.get('/',transfersController.getAll);

module.exports = router;