const instance = require('../config/workfront');

module.exports = objectsCount = async (objCode, query) => {
    try {
        return await instance.count(objCode, query);
    } catch (e) {
        throw new Error(e.message);
    }
};