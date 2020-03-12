const { getDBProjects } = require('../services');

const getAllProjects = async (req, res, next) => {
    try {
        const projects = await getDBProjects();
        res.json(projects);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    getAllProjects
};