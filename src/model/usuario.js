const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // id auto incrementa
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true //email unico 
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Usuario;