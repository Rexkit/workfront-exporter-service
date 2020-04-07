const sequelize = require('../db/models');

module.exports = dropAll = async () => {
    try {
        await Promise.all([
            sequelize.Update.destroy({where: {}}).then(function () {}),
            sequelize.Document.destroy({where: {}}).then(function () {}),
            sequelize.Project.destroy({where: {}}).then(function () {}),
            sequelize.User.destroy({where: {}}).then(function () {})
        ]);
        console.log("Successfully dropped all data form tables")
    } catch (e) {
        throw new Error(e.message);
    }
};