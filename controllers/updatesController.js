const { getDBUpdates } = require('../services');

const getAllUpdates = async (req, res, next) => {
    try {
        const updates = await getDBUpdates();
        res.json(updates);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    getAllUpdates
};
