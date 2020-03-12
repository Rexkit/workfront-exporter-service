const dataController = require('./dataUpdateController');
const sysAuthController = require('./sysAuthController');
const usersController = require('./usersController');
const projectsController = require('./projectsController');
const updatesController = require('./updatesController');

module.exports = {
    ...dataController,
    ...sysAuthController,
    ...usersController,
    ...projectsController,
    ...updatesController
};