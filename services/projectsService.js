const instance = require('../config/workfront');
const Project = require('../db/models').Project;

const replaceDate = require('../utils/replaceDate');

const filterUpdates = updates => {
  const filteredUpdates = updates.filter(update => update.updateObjCode !== "JRNLE");

  return filteredUpdates;
};

const getWfProjects = async () => {
    try {
        const projectList = await instance.search("project", {}, [
            "ID:*",
            "actualCompletionDate:*",
            "actualStartDate:*",
            "description:*",
            "lastUpdateDate:*",
            "percentComplete:*",
            "ownerID:*",
            "updates:enteredByName",
            "updates:entryDate",
            "updates:message",
            "updates:nestedUpdates"
        ]);

        return projectList.map(project => {
            return {
                id: project.ID,
                name: project.name,
                actualCompletionDate: replaceDate(project.actualCompletionDate),
                actualStartDate: replaceDate(project.actualStartDate),
                description: project.description,
                percentComplete: project.percentComplete,
                ownerId: project.ownerID,
                updates: filterUpdates(project.updates),
                lastUpdateDate: replaceDate(project.lastUpdateDate)
            }
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

const setWfProjects = async projectsArr => {
  try {
      if (projectsArr) {
          for(const project of projectsArr) {
              await Project.create(project).catch(err => console.log(err));
          }
      }
  } catch (e) {
      throw new Error(e.message);
  }
};

module.exports = {
    getWfProjects,
    setWfProjects
};