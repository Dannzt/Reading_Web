const Livraria = require('../model/livraria');
const Usuario = require('../model/usuario');

function getLivrariaView(request, response){
    response.render('usuario_cadastro.html');
}

async function criarLivraria(usuario) {
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

async function cadastrarLivraria(request, response) {
    try {
        const livraria = await getLivraria(request.usuario)
        //Checa se a livraria é definida.
        if (livraria) {
            request.flash.save("sucesso", true)
            response.redirect("/home");
        } else {
            request.flash.save("erro", `ERRO DURANTE A CRIAÇÃO DA LIVRARIA`)
            response.redirect("/usuario-login");
        }
    } catch (err) {
        console.log(`ERROR AO CADASTRAR A LIVRARIA: ${err}`)
        response.redirect("/usuario-login")
    }
}

function listarLivrarias(request, response) {
    Livraria.findAll().then((livrarias)=>{
        response.json(livrarias);
    }).catch((err)=>{
        response.json(err);
    });
}

module.exports = {
    cadastrarLivraria,
    listarLivrarias,
    criarLivraria,
    getLivraria,
    getLivrariaView
}