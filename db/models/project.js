'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    actualCompletionDate: {
      type: DataTypes.DATE
    },
    actualStartDate: {
      type: DataTypes.DATE
    },
    plannedCompletionDate: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING(4000)
    },
    percentComplete: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    ownerId: {
      type: DataTypes.STRING
    },
    lastUpdateDate: {
      type: DataTypes.DATE
    }
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      foreignKey: 'ownerId'
    });
  };
  return Project;
};