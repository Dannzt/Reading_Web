const express = require('express');
const router = express.Router();

const anotacaoController = require('../controller/anotacaoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', anotacaoController.indexView);
router.get('/autenticar-usuario', autenticacaoController.verificarAutenticacao, anotacaoController.homeView);
router.post('/cadastrar-anotacao', autenticacaoController.verificarAutenticacao, anotacaoController.cadastrarAnotacao) // tipo post, se passar pela autentificador, cadastra sua analise.

module.exports = router;