'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};