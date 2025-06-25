const Usuario = require('../model/usuario');

function getCadastroView(request, response){
    response.render('usuario_cadastro.html');
}

function cadastrarUsuario(request, response) {
    let usuario = {
        email: request.body.email,
        senha: request.body.senha,
        nome: request.body.nome,
        data_nascimento: request.body.data_nascimento
    }
    
    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        request.flash.save("sucesso", true)
        response.redirect("/usuario-login");
    }).catch((err)=>{
        console.log(err);
        request.flash.save("erro", `Erro durante o cadastro do usuario: ${err}`)
        response.redirect("/usuario-login");
    });
}

function listarUsuarios(request, response) {
    Usuario.findAll().then((usuarios)=>{
        response.json(usuarios);
    }).catch((err)=>{
        response.json(err);
    });
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    getCadastroView 
}