const authService = require('./authService');
const usersServices = require('./usersService');
const projectsService = require('./projectsService');

module.exports = {
    ...authService,
    ...usersServices,
    ...projectsService
};