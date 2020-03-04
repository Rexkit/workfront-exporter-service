'use strict';
module.exports = (sequelize, DataTypes) => {
  const Update = sequelize.define('Update', {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    topObjID: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    documentID: {
      type: DataTypes.STRING
    },
    noteText: {
      allowNull: false,
      type: DataTypes.STRING(4000)
    },
    entryDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    replies: {
      type: DataTypes.JSON
    }
  }, {});
  Update.associate = function(models) {
    // associations can be defined here
    Update.belongsTo(models.Project, {
      foreignKey: 'topObjID'
    });
    Update.belongsTo(models.User, {
      foreignKey: 'ownerId'
    });
    Update.belongsTo(models.Document, {
      foreignKey: 'documentId'
    });
  };
  return Update;
};