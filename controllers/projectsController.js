const { getDBProjects, getDBProjectById } = require('../services');

const getAllProjects = async (req, res, next) => {
    try {
        const projects = await getDBProjects();
        res.json(projects);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

const getProjectById = async (req, res, next) => {
    const projectId = req.params.id;
    try {
        const project = await getDBProjectById(projectId);
        res.json(project);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    getAllProjects,
    getProjectById
};