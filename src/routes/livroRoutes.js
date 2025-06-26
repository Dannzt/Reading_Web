const express = require('express');
const router = express.Router();

const livrariaController = require('../controller/livrariaController');

router.get('/cadastrar-livro', livrariaController.cadastrarLivraria);
router.get('/api/livros', livrariaController.listarLivrarias);

module.exports = router;