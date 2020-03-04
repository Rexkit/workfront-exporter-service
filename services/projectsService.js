const instance = require('../config/workfront');
const Project = require('../db/models').Project;

const replaceDate = require('../utils/replaceDate');
const objectCount = require('../utils/objectsCount');

const getWfProjects = async () => {
    try {
        const OBJ_LIMIT = 2000;
        const projects = [];
        const projectsCount = await objectCount("project");

        for (let i = 0; i < projectsCount; i+=OBJ_LIMIT) {
            const projectsCut = await instance.search(
                "project",
                {
                    $$FIRST: i,
                    $$LIMIT: OBJ_LIMIT
                },
                ["ID:*",
                    "actualCompletionDate:*",
                    "actualStartDate:*",
                    "description:*",
                    "lastUpdateDate:*",
                    "percentComplete:*",
                    "ownerID:*"]
            );
            projects.push(...projectsCut);
        }

        return projects.map(project => {
            return {
                id: project.ID,
                name: project.name,
                actualCompletionDate: replaceDate(project.actualCompletionDate),
                actualStartDate: replaceDate(project.actualStartDate),
                description: project.description,
                percentComplete: project.percentComplete,
                ownerId: project.ownerID,
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