const Usuario = require('../model/usuario'); // chamando tabela de usuarios

async function autenticarUsuario(request, response){
    const usuario = await Usuario.findOne({ //await garantir codigo sequencial (async)
        where: {
        email: request.body.email,
        senha: request.body.senha
    }
    });
    // grava a informação do usuario dentro da sessão 
    if(usuario !== null){
        request.session.autorizado = true; //criando um valor temporário para mostrar que está logado na sessão
        request.session.usuario = usuario;
        response.redirect('/home'); // apos a validação retorna para a home page
    }
    else{
        console.log("Usuario não autorizado!")
        request.flash.save('error', "Usuario Nulo!")
        response.redirect('/usuario-login'); // caso usuario não logue, volta para a tela inicial com mensagem de erro
    }
}
// verificar a veracidade da autentificação
function verificarAutenticacao(request, response, next) {
    if(request.session.autorizado){
        console.log("usuário autorizado");
        next();
    }
    else{
        console.log("usuário NÃO autorizado");
        response.redirect('/usuario-login'); // caso o usuario dê logout, irá ser encamidado para a pagina de origem
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
    sair
}