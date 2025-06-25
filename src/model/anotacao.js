const Sequelize = require('sequelize');
const database = require('../db');

const Anotacao = database.define('anotacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // propriedades anotações
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subtitulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    texto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    indicador_ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estilo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// definição de tabela, com as informações das anotações
module.exports = Anotacao;