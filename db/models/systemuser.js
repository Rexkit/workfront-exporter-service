'use strict';
module.exports = (sequelize, DataTypes) => {
    const SystemUser = sequelize.define('SystemUser', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    SystemUser.associate = function(models) {
        // associations can be defined here
    };
    return SystemUser;
};