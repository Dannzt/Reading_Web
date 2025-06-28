const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');
const autenticacaoController = require('../controller/autenticacaoController');

//Tipo post, se passar pelo autentificador, cadastra sua análise.
router.get('/home', autenticacaoController.verificarAutenticacao, homeController.homeView);

module.exports = router;