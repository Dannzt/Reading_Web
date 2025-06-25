const Anotacao = require('../model/anotacao');

function indexView(req, res) {
    res.render('index.html');
}

function homeView(req, res) {

    Anotacao.findAll({
        where: {
            id_usuario: req.session.usuario.id, // criterio para a verificação da listagem anotações filtrando pelo id do usuario
            indicador_ativo: 1 //funcioando caso esteja ativa ( 1 = ligado )
        }
    }).then((anotacaos)=>{
        res.render('home.html', {anotacaos}); // listagem de anotações
    }).catch((erro_recupera_anotacaos)=>{
        res.render('home.html', {erro_recupera_anotacaos}); // caso de error, não imprima a lista e apareça um erro (passando objeto de error)
    });

    
}
// ambiente recebe as informações anotadas
function cadastrarAnotacao(req, res) {
    let anotacao = {
        titulo: req.body.titulo,
        id_usuario: req.session.usuario.id,
        subtitulo: req.body.subtitulo,
        texto: req.body.texto,
        indicador_ativo: 1,
        estilo: req.body.estilo
    }
    
    Anotacao.create(anotacao).then(()=>{
        res.redirect('/home');
    }).catch((err)=>{
        console.log(err);
        let erro_cadastrar_anotacao = true;
        res.render("home.html", {erro_cadastrar_anotacao});
    });

}

module.exports = {
    indexView,
    homeView,
    cadastrarAnotacao
}