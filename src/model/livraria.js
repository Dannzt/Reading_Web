const Sequelize = require('sequelize');
const database = require('../db');

const Livraria = database.define('livraria', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // id auto incrementa
        allowNull: false,
        primaryKey: true
    },
    usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true //email unico
    }
});

module.exports = Livraria;