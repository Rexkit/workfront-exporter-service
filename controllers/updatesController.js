const { getDBUpdates, getDBUpdatesByProjectId } = require('../services');

const getAllUpdates = async (req, res, next) => {
    try {
        const updates = await getDBUpdates();
        res.json(updates);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

const getUpdatesByProjectId = async (req, res, next) => {
    const projectId = req.params.id;
    try {
        const updates = await getDBUpdatesByProjectId(projectId);
        res.json(updates);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    getAllUpdates,
    getUpdatesByProjectId
};
