'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerID'
        }
      },
      downloadURL: {
        allowNull: false,
        type: Sequelize.STRING
      },
      projectID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectID'
        }
      },
      lastModDate: {
        allowNull: false,
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
    return queryInterface.dropTable('Documents');
  }
};