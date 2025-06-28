const express = require('express');
const multer = require('multer')
const UUID = require('uuid')
const path = require('path')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads/images")
    },
    //Esta parte garante que o nome do arquivo se torne UUID.
    filename: function (request, file, callback) {
        const extension = path.extname(file.originalname)
        callback(null, UUID.v4() + extension)
    }
})

const imagesUpload = multer({ storage: storage })

const livroController = require('../controller/livroController');
const autenticacaoController = require('../controller/autenticacaoController')

router.post(
    '/cadastrar-livro',
    autenticacaoController.verificarUsuario,
    imagesUpload.single('imagem'),
    livroController.cadastrarLivro
);
router.get('/api/livros', livroController.listarLivros);

module.exports = router;