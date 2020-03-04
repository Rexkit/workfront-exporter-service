const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects, getWfUpdates, setWfUpdates, getWfDocuments, setWfDocuments }  = require('../services');

const dataUpdate = async (req, res, next) => {
    try {
        await wfLogin();
        let [users, projects, documents] = await Promise.all([
            getWfUsers(),
            getWfProjects(),
            getWfDocuments()
        ]);
        let updates = await getWfUpdates(projects);
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