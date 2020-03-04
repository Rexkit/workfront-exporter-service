const authService = require('./authService');
const usersServices = require('./usersService');
const projectsService = require('./projectsService');
const updatesService = require('./updatesService');

module.exports = {
    ...authService,
    ...usersServices,
    ...projectsService,
    ...updatesService
};