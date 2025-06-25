const Anotacao = require('../model/anotacao');

function indexView(req, res) {
    res.render('usuario_login.html');
}

function homeView(request, response) {

    Anotacao.findAll({
        where: {
            id_usuario: request.session.usuario.id, // criterio para a verificação da listagem anotações filtrando pelo id do usuario
            indicador_ativo: 1 //funcioando caso esteja ativa ( 1 = ligado )
        }
    }).then((anotacaos)=>{
        response.render('home.html', {anotacaos}); // listagem de anotações
    }).catch((erro_recupera_anotacaos)=>{
        response.render('home.html', {erro_recupera_anotacaos}); // caso de error, não imprima a lista e apareça um erro (passando objeto de error)
    });

    
}
// ambiente recebe as informações anotadas
function cadastrarAnotacao(request, response) {
    let anotacao = {
        titulo: request.body.titulo,
        id_usuario: request.session.usuario.id,
        subtitulo: request.body.subtitulo,
        texto: request.body.texto,
        indicador_ativo: 1,
        estilo: request.body.estilo
    }
    
    Anotacao.create(anotacao).then(()=>{
        response.redirect('/home');
    }).catch((err)=>{
        console.log(err);
        let erro_cadastrar_anotacao = true;
        response.render("home.html", {erro_cadastrar_anotacao});
    });

}

module.exports = {
    indexView,
    homeView,
    cadastrarAnotacao
}