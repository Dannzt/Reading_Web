const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.post('/usuario-cadastro', usuarioController.cadastrarUsuario);
router.get('/api/usuarios', usuarioController.listarUsuarios);

router.get('/usuario-login', (request, response) => {
    response.render('usuario_login.html')
});
router.get('/usuario-cadastro', (request, response) => {
    response.render('usuario_cadastro.html');
});

module.exports = router;