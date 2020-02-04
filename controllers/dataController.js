const { login, getUsers }  = require('../services');

const dataUpdate = async (req, res, next) => {
    try {
        await login();
        const users = await getUsers();
        res.send(users);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    dataUpdate
};