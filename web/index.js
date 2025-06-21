//npm init
//npm install express@4.21.2 para iniciar

// no html : npm install mustache-express@1.3.2

// chamada nodejs
const express  = require ('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(express.static('public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const erro_form = req.query.erro_form;
    res.render('login.html', { erro_form });
});



const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});