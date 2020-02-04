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
      allowNull: false,
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING
    },
    percentComplete: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.User, {
      foreignKey: 'ownerId'
    });
  };
  return Project;
};