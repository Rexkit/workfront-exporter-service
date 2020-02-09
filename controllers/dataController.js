const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects }  = require('../services');

const dataUpdate = async (req, res, next) => {
    try {
        await wfLogin();
        let [users, projects] = await Promise.all([
            getWfUsers(),
            getWfProjects()
        ]);
        await setWfUsers(users);
        await setWfProjects(projects);
        res.json(projects);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    dataUpdate
};