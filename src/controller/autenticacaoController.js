const Usuario = require('../model/usuario'); // chamando tabela de usuarios

async function autenticarUsuario(request, response){
    const usuario = await Usuario.findAll({ //await garantir codigo sequencial (async)
        where: {
        email: request.body.email,
        senha: request.body.senha
        },
        raw: true
    });
    // grava a informação do usuario dentro da sessão 
    if(usuario !== null){
        request.session.autorizado = true; //criando um valor temporário para mostrar que está logado na sessão
        request.session.usuario = usuario[0];
        response.redirect('/home'); // apos a validação retorna para a home page
    } else {
        console.log("Usuario não detectado!")
        request.flash.save('error', "Usuario Nulo!")
        response.redirect('/usuario-login'); // caso usuario não logue, volta para a tela inicial com mensagem de erro
    }
}
//Verificar a veracidade da autentificação
function verificarAutenticacao(request, response, next) {
    if(request.session.autorizado){
        console.log("Usuário autorizado!");
        next();
    } else {
        console.log("Usuário NÃO autorizado!");
        response.redirect('/usuario-login'); // caso o usuario dê logout, irá ser encaminhado para a pagina de origem
    }
}

//Verifica se tem um usuário logado na sessão.
function verificarUsuario(request, response, next) {
    if(request.session.usuario) {
        next()
    } else {
        console.log("Usuário NÃO está logado nesta sessão!")
        response.redirect('/usuario-login')
    }
}

//Verifica se NÃO tem um usuário logado na sessão.
function verificarNaoUsuario(request, response, next) {
    if(!request.session.usuario) {
        next()
    } else {
        console.log("Usuário já esta logado nesta sessão!")
        response.redirect('/home')
    }
}

// como as informações são gravadas na sessão, para sair e só destruir essa sessão
function sair(request, response) {
    request.session.destroy();
    response.redirect('/');
}

module.exports = {
    autenticarUsuario,
    verificarAutenticacao,
    verificarUsuario,
    verificarNaoUsuario,
    sair
}