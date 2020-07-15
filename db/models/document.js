  'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ownerID: {
      type: DataTypes.STRING
    },
    projectID: {
      type: DataTypes.STRING
    },
    downloadURL: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastModDate: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Document.associate = function(models) {
    // associations can be defined here
    Document.belongsTo(models.User, {
      foreignKey: 'ownerId'
    });
    Document.belongsTo(models.Project, {
      foreignKey: 'projectId'
    });
  };
  return Document;
};