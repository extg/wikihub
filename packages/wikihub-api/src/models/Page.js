'use strict';

const sequelize = require('../sequalize');
const User = require('./User');
const Organization = require('./Organization');

const Page = sequelize.define('page', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ownerUserId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    ownerOrganizationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Organization,
            key: 'id',
        }
    },
    parentPageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Page,
            key: 'id',
        }
    },
    path: {
        type: Sequelize.STRING,
    },
    title: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.ENUM('guest', 'user', 'admin'),
    },
}, {
    timestamps: true,
});

module.exports = Page;
