const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
router.get('/api/usuarios', usuarioController.listarUsuarios);

router.get('/cadastro_usuario', (request, response) => {
    response.render('cadastrar_usuario.html');
});


module.exports = router;