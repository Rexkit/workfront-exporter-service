'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Updates', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      topObjID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Projects',
          key: 'id',
          as: 'topObjID'
        }
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerID'
        }
      },
      documentID: {
        type: Sequelize.STRING,
        references: {
          model: 'Documents',
          key: 'id',
          as: 'documentID'
        }
      },
      noteText: {
        allowNull: false,
        type: Sequelize.STRING(4000)
      },
      entryDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      replies: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Updates');
  }
};