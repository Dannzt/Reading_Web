const LivroController = require('../controller/livroController');
const LivrariaController = require('../controller/livrariaController')

function indexView(req, res) {
    res.render('usuario_login.html');
}

async function homeView(request, response) {
    try {
        let livraria = await LivrariaController.getLivraria(request.session.usuario)
        let livros = await LivroController.getLivros(livraria)
        response.render('home.html', {
            livros: livros
        })

    } catch(err) {
        console.log(`ERRO DURANTE A RENDERIZAÇÃO DA /HOME: ${err}`)
        response.render('home.html')
    }
}

module.exports = {
    homeView
}