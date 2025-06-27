const Sequelize = require('sequelize');
const database = require('../db');

const Livro = database.define('livro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    livraria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
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
    imagem: {
        type: Sequelize.UUID,
        allowNull: true
    }
});

module.exports = Livro;