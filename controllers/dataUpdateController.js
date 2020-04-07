const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects, getWfUpdates, setWfUpdates, getWfDocuments, setWfDocuments }  = require('../services');
const dropAll = require('../utils/dropAll');

const dataUpdate = async (req, res, next) => {
    try {
        console.log('Starting DataUpdate');
        await dropAll();
        await wfLogin();
        let [users, projects] = await Promise.all([
            getWfUsers(),
            getWfProjects()
        ]);
        console.log('Successfully got Workfront users and projects');
        let [updates, documents] = await Promise.all([
            getWfUpdates(projects),
            getWfDocuments(projects)
        ]);
        console.log('Successfully got Workfront updates and documents');
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