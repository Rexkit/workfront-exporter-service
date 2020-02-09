const { getWfUsersDB } = require('../services');

const getUsers = async (req, res, next) => {
    try {
        const users = await getWfUsersDB();
        res.json(users);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
  getUsers
};