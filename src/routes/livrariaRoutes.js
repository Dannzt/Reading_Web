const express = require('express');
const router = express.Router();

const livrariaController = require('../controller/livrariaController');

router.get('/api/livrarias', livrariaController.listarLivrarias);

module.exports = router;