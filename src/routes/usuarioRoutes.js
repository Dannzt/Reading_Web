const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.post('/usuario_cadastro', usuarioController.cadastrarUsuario);
router.get('/api/usuarios', usuarioController.listarUsuarios);

router.get('/usuario_cadastro', (request, response) => {
    response.render('usuario_cadastro.html');
});


module.exports = router;