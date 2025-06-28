const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');
const autenticacaoController = require('../controller/autenticacaoController')

router.post('/usuario-cadastro', usuarioController.cadastrarUsuario);
router.get('/api/usuarios', usuarioController.listarUsuarios);

router.get('/usuario-login', autenticacaoController.verificarNaoUsuario, (request, response) => {
    response.render('usuario_login.html')
});
router.get('/usuario-cadastro', autenticacaoController.verificarNaoUsuario, (request, response) => {
    response.render('usuario_cadastro.html');
});

module.exports = router;