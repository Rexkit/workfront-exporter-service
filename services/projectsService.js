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
          console.log('Successfully set projects to DB');
      } else {
          console.log('No projects were specified for set operation');
      }
  } catch (e) {
      throw new Error(e.message);
  }
};

const getDBProjects = async (options = {
    attributes: [
        'id',
        'name',
        'actualCompletionDate',
        'actualStartDate',
        'description',
        'percentComplete',
        'ownerId',
        'lastUpdateDate'
    ]
}) => {
    try {
        return await Project.findAll(options = {
            attributes: [
                'id',
                'name',
                'actualCompletionDate',
                'actualStartDate',
                'description',
                'percentComplete',
                'ownerId',
                'lastUpdateDate'
            ]});
    } catch (e) {
        throw new Error(e.message);
    }
};

const getDBProjectById = async id => {
    try {
        return await Project.findByPk(id);
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    getWfProjects,
    setWfProjects,
    getDBProjects,
    getDBProjectById
};