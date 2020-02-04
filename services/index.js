const authService = require('./authService');
const usersServices = require('./usersService');

module.exports = {
    ...authService,
    ...usersServices
};