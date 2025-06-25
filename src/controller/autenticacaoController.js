const Usuario = require('../model/usuario'); // chamando tabela de usuarios

async function autenticar(req, res){
    const usuario = await Usuario.findOne({ //await garantir codigo sequencial (async)
        where: {
        email: req.body.email, 
        senha: req.body.senha
    }
    });
    // grava a informação do usuario dentro da sessão 
    if(usuario !== null){
        req.session.autorizado = true; //criando um valor temporario para mostrar que está logado na sessão
        req.session.usuario = usuario;
        res.redirect('/home'); // apos a validação retorna para a home page
    }
    else{
        let erro_autenticacao = true;
        res.render('index.html', {erro_autenticacao}); // caso ususario não logue, volta para a tela inicial com mensagem de erro
    }
}
// verificar a veracidade da autentificação
function verificarAutenticacao(req, res, next) {
    if(req.session.autorizado){
        console.log("usuário autorizado");
        next();
    }
    else{
        console.log("usuário NÃO autorizado");
        res.redirect('/'); // caso o usuario dê logout, irá ser encamidado para a pagina de origem 
    }   
}

// como as informações são gravadas na sessão, para sair e só destruir essa sessão
function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    autenticar,
    verificarAutenticacao,
    sair
}