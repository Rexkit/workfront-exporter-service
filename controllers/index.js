const dataController = require('./dataController');
const sysAuthController = require('./sysAuthController');

module.exports = {
    ...dataController,
    ...sysAuthController
};