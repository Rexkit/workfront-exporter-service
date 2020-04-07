const Cron = require('cron').CronJob;
const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects, getWfUpdates, setWfUpdates, getWfDocuments, setWfDocuments }  = require('../services');
const dropAll = require('../utils/dropAll');

module.exports = new Cron('0 0 0 * * *', async () => {
    try {
        console.log('Executing DataUpdate cronJob');
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
    } catch (e) {
        throw new Error(e.message);
    }
}, null, true, 'America/Los_Angeles');