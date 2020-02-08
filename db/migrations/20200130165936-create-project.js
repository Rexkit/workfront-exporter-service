'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      actualCompletionDate: {
        type: Sequelize.DATE
      },
      actualStartDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING(4000)
      },
      percentComplete: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerId'
        }
      },
      lastUpdateDate: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Projects');
  }
};