const UUID = require('uuid')
const path = require('path')
const Multer = require('multer')

const Livro = require('../model/livro');

const LivrariaController = require ('../controller/livrariaController')
const ImagemController = require('../controller/imagemController');

function getLivrariaView(request, response){
    response.render('home.html');
}

async function criarLivro(request) {
    let livraria = await LivrariaController.getLivraria(request.session.usuario)
    let imagem = await ImagemController.cadastrarImagem(request)
    let livro = {
        livraria_id: parseInt(livraria.id),
        titulo: request.body.titulo,
        genero: request.body.genero,
        descricao: request.body.descricao,
        pagina_total: parseInt(request.body.pagina_total),
        pagina_atual: parseInt(request.body.pagina_atual),
        imagem: imagem.uuid
    };
    return Livro.create(livro);
}

//Procura e retorna um caminho de imagem com o UUID dado, caso não encontre sera
//retornado um caminho default.
async function getLivros(livraria) {
    try {
        const livro = await Livro.findAll({
            where: { livraria_id: livraria.id }
        });

        if (livro.length === 0) {
            console.log('WARNING!: NÃO FOI ENCONTRADO LIVROS NA LIVRARIA!')
            return undefined;
        } else {
            return livro[0];
        }
    } catch(err) {
        console.log(`ERRO AO OS LIVROS!: ${err}`);
        return undefined;
    }
}

async function getLivro(livraria, nome) {
    try {
        const livro = await Livro.findAll({
            where: {
                livraria_id: livraria.id,
                nome: nome
            }
        });
        if (livro.length === 0) {
            console.log(`WARNING!: LIVRO [${nome}] NÃO ENCONTRADO!`)
            return undefined;
        } else {
            return livro[0];
        }
    } catch(err) {
        console.log(`ERRO AO OBTER LIVRO!: ${err}`);
        return undefined;
    }
}

function cadastrarLivro(request, response) {
    criarLivro(request).then(() => {
        console.log(`Livro [${request.body.nome}] cadastrado!`);
        response.redirect("/home")
    }).catch((err) => {
        console.log(`ERRO AO CADASTRAR LIVRO!: ${err}`);
        response.redirect("/home")
    });
}

function listarLivros(request, response) {
    Livro.findAll().then((livros)=>{
        response.json(livros);
    }).catch((err)=>{
        response.json(err);
    });
}

module.exports = {
    criarLivro,
    getLivros,
    getLivro,
    cadastrarLivro,
    listarLivros
}