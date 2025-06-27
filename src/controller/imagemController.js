const UUID = require('uuid')
const path = require('path')
const Multer = require('multer')

const Imagem = require('../model/imagem');

async function criarImagem(file) {
    let file_uuid = path.parse(file.filename).name;
    let file_path = file.path;
    let imagem = {
        uuid: file_uuid,
        path: file_path,
    };
    return Imagem.create(imagem);
}

//Procura e retorna um caminho de imagem com o UUID dado, caso não encontre sera
//retornado um caminho default.
async function getImagem(uuid) {
    if (!uuid) { return 'defaults/images/no_image.png'}
    try {
        const imagem = await Imagem.findAll({
            where: { uuid: uuid },
            raw: true
        });

        if (imagem.length === 0) {
            return 'defaults/images/no_image.png';
        } else {
            return imagem[0].path;
        }
    } catch(err) {
        console.log(`ERRO AO OBTER IMAGEM!: ${err}`);
        return 'defaults/images/no_image.png';
    }
}

async function cadastrarImagem(request) {
    if (!request.file) return undefined
    try{
        let imagem = await criarImagem(request.file)
        console.log(`Imagem [${request.file.originalname}] cadastrada!`);
        return { uuid: imagem.uuid, path: imagem.path }
    } catch(err) {
        console.log(`ERRO AO CADASTRAR IMAGEM!: ${err}`);
        return undefined
    }
}

function listarImagens(request, response) {
    Imagem.findAll().then((imagens)=>{
        response.json(imagens);
    }).catch((err)=>{
        response.json(err);
    });
}

module.exports = {
    criarImagem,
    getImagem,
    cadastrarImagem,
    listarImagens
}