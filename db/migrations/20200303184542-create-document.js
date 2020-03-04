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