const sequelize = require('../db/models');

module.exports = dropAll = () => {
    sequelize.Update.destroy({where: {}}).then(function () {});
    sequelize.Document.destroy({where: {}}).then(function () {});
    sequelize.Project.destroy({where: {}}).then(function () {});
    sequelize.User.destroy({where: {}}).then(function () {});
};