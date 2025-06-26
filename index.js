const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const db = require('./src/db')

const app = express()

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',  
    resave: false,
    saveUninitialized: false
}))

app.use((request, response, next) => {

    if (!request.session.flash) {
        request.session.flash = {}
    }

    request.flash = {
        /**
         * Guarda um valor temporário na sessão.
         * @param {string} name - Nome do valor
         * @param {*} value - O valor em sí que será guardado
         */
        save: function(name, value) {
            request.session.flash[name] = value
        },
        //Load pode retornar um valor UNDEFINED se o valor não existir!
        /**
         * Pega o valor guardado da sessão e retorna ela.
         * @param {string} name - nome do valor
         */
        load: function(name) {
            const value =  request.session.flash[name]
            delete request.session.flash[name]
            return value
        },

        loadAllAndClear: function() {
            const allValues = { ...request.session.flash}
            request.session.flash = {}
            return allValues
        }
    }

    response.locals.flash = request.flash.loadAllAndClear()

    next()
});

// Define as rotas da aplicação (declaradas na pasta /src/routes/)
app.use('/', require('./src/routes/anotacaoRoutes'));
app.use('/', require('./src/routes/usuarioRoutes')); // informação usuario 
app.use('/', require('./src/routes/autenticacaoRoutes')); //validação autenticação
app.use('/', require('./src/routes/livrariaRoutes'))
app.use('/', require('./src/routes/livroRoutes'))

db.sync(() => console.log(`Banco de dados conectado`));

const app_port = 8080
app.listen(app_port, function () {
    console.log('app rodando na porta ' + app_port)
})