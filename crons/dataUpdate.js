const Cron = require('cron').CronJob;
const { wfLogin, getWfUsers, setWfUsers, getWfProjects, setWfProjects, getWfUpdates, setWfUpdates, getWfDocuments, setWfDocuments }  = require('../services');
const dropAll = require('../utils/dropAll');

module.exports = new Cron('0 0 0 * * *', async () => {
    try {
        console.log('Executing DataUpdate cronJob');
        dropAll();
        await wfLogin();
        console.log('Successfully logged into Workfront');
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
        console.log('Successfully set user to DB');
        await setWfProjects(projects);
        console.log('Successfully set projects to DB');
        await setWfDocuments(documents);
        console.log('Successfully set documents to DB');
        await setWfUpdates(updates);
        console.log('Successfully set updates to DB');
    } catch (e) {

    }
}, null, true, 'America/Los_Angeles');