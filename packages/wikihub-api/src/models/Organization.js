'use strict';

const sequelize = require('../sequalize');

const Organization = sequelize.define('organization', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
});

module.exports = Organization;
