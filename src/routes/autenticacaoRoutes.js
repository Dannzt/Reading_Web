const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');
const anotacaoController = require('../controller/anotacaoController')

router.post('/autenticar-usuario', autenticacaoController.autenticarUsuario); // autenticar login usuario
router.get('/home', anotacaoController.homeView);
router.get('/sair', autenticacaoController.sair); // logout usuario 

module.exports = router;