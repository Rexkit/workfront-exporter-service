const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects, getWfUpdates, setWfUpdates, getWfDocuments, setWfDocuments }  = require('../services');

const dataUpdate = async (req, res, next) => {
    try {
        await wfLogin();
        let [users, projects] = await Promise.all([
            getWfUsers(),
            getWfProjects()
        ]);
        let [updates, documents] = await Promise.all([
            getWfUpdates(projects),
            getWfDocuments(projects)
        ]);
        await setWfUsers(users);
        await setWfProjects(projects);
        await setWfDocuments(documents);
        await setWfUpdates(updates);
        res.json(updates);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    dataUpdate
};