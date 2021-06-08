const express = require('express');
const { Router } = require('express');

const transferController = require('../controllers/transferController');
const router = express.Router();

router.get('/:id',transferController.getAllByCustomerId);
router.post('/',transferController.insert);

module.exports = router;