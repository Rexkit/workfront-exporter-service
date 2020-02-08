const { wfLogin, getWfUsers, setWfUsers, getWfUsersDB }  = require('../services');

const dataUpdate = async (req, res, next) => {
    try {
        await wfLogin();
        const users = await getWfUsers();
        await setWfUsers(users);
        const fetchedUsers = await getWfUsersDB();
        res.send(fetchedUsers);
        next();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    dataUpdate
};