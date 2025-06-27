const Sequelize = require('sequelize');
const database = require('../db');

const Imagem = database.define('imagem', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true //caminha unico
    }
});

module.exports = Imagem;