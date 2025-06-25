const Usuario = require('../model/usuario'); // chamando tabela de usuarios

async function autenticar(request, response){
    const usuario = await Usuario.findOne({ //await garantir codigo sequencial (async)
        where: {
        email: request.body.email,
        senha: request.body.senha
    }
    });
    // grava a informação do usuario dentro da sessão 
    if(usuario !== null){
        request.session.autorizado = true; //criando um valor temporario para mostrar que está logado na sessão
        request.session.usuario = usuario;
        response.redirect('/home'); // apos a validação retorna para a home page
    }
    else{
        let erro_autenticacao = true;
        response.render('usuario_login.html', {erro_autenticacao}); // caso ususario não logue, volta para a tela inicial com mensagem de erro
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
        response.redirect('/'); // caso o usuario dê logout, irá ser encamidado para a pagina de origem
    }   
}

// como as informações são gravadas na sessão, para sair e só destruir essa sessão
function sair(request, response) {
    request.session.destroy();
    response.redirect('/');
}

module.exports = {
    autenticar,
    verificarAutenticacao,
    sair
}