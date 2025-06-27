const UUID = require('uuid')
const path = require('path')
const Multer = require('multer')

const Livraria = require('../model/livraria');
const Imagem = require('../model/imagem');

function getLivrariaView(request, response){
    response.render('home.html');
}

async function criarImagem(usuario) {
    let livraria = {
        usuario: usuario.id
    }
    return Livraria.create(livraria)
}

//Procura e retorna a livraria do usuario. Cria uma caso não tenha.
async function getLivraria(usuario) {
    try {
        const livrarias = await Livraria.findAll({
            where: { usuario: usuario.id }
        })

        if (livrarias.length === 0) {
            return await criarLivraria(usuario);
        } else {
            return livrarias[0];
        }
    } catch(err) {
        console.log(`ERRO AO OBTER OU CRIARA A LIVRARIA: ${err}`);
        return undefined;
    }
}

function cadastrarImagem(request, response) {
    let file_uuid = path.parse(request.file.filename).name;
    let file_path = request.file.path;
    console.log(request.file);
    let imagem = {
        uuid: file_uuid,
        path: file_path,
    };
    Imagem.create(imagem).then(() => {
        response.redirect('/imagem-teste')
    }).catch((err) => {
        console.log(err);
        response.redirect('/imagem-teste')
    });
}

function listarImagens(request, response) {
    Imagem.findAll().then((imagens)=>{
        response.json(imagens);
    }).catch((err)=>{
        response.json(err);
    });
}

module.exports = {
    cadastrarImagem,
    listarImagens
}