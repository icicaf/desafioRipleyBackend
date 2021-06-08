const express = require('express');
const { Router } = require('express');

const destinataryController = require('../controllers/destinataryController');
const router = express.Router();

router.get('/:id',destinataryController.getAllByCustomerId);
router.post('/',destinataryController.insert);

module.exports = router;