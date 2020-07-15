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
      plannedCompletionDate: {
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
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerId'
        }
      },
      updates: {
        type: Sequelize.JSON
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