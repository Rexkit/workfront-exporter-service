'use strict';
module.exports = (sequelize, DataTypes) => {
  const SystemUser = sequelize.define('SystemUser', {
    id: DataTypes.INTEGER
  }, {});
  SystemUser.associate = function(models) {
    // associations can be defined here
  };
  return SystemUser;
};