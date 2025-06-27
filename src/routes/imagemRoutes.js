const express = require('express');
const multer = require('multer')
const UUID = require('uuid')
const path = require('path')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads/images")
    },
    filename: function (request, file, callback) {
        const extension = path.extname(file.originalname)
        callback(null, UUID.v4() + extension)
    }
})

const imagesUpload = multer({ storage: storage })

const imagemController = require('../controller/imagemController');

router.post('/criar-imagem', imagesUpload.single('imagem'), imagemController.cadastrarImagem);
router.get('/imagem-teste', (request, response) => {
    response.render('imagem_test.html')
})

module.exports = router