const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');

router.post('/autenticar', autenticacaoController.autenticar); // autenticar login usuario 
router.get('/sair', autenticacaoController.sair); // logout usuario 

module.exports = router;