const Sequelize = require('sequelize');
const database = require('../db');

const Livro = database.define('livro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    livraria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true //O livro PRECISA ser parte de apenas uma livraria.
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pagina_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pagina_atual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.UUID,
        unique: true
    }
});

module.exports = Livro;