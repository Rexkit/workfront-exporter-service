const dataController = require('./dataController');
const sysAuthController = require('./sysAuthController');
const usersController = require('./usersController');

module.exports = {
    ...dataController,
    ...sysAuthController,
    ...usersController
};