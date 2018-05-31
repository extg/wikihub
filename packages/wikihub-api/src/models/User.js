'use strict';

const sequelize = require('../sequalize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
});

module.exports = User;
