const dataController = require('./dataUpdateController');
const sysAuthController = require('./sysAuthController');
const usersController = require('./usersController');
const projectsController = require('./projectsController');
const updatesController = require('./updatesController');
const documentsController = require('./documentsController');

module.exports = {
    ...dataController,
    ...sysAuthController,
    ...usersController,
    ...projectsController,
    ...updatesController,
    ...documentsController
};