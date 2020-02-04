const instance = require('../config/workfront');
const ApiConstants = require("workfront-api-constants");

const getUsers = async () => {
    const allowedProps = ['ID', 'name', 'title', 'emailAddr'];
    let query = {};
    query["isActive"] = true;
    query["isActive" + ApiConstants.MOD] = ApiConstants.Operators.EQUAL;
    const rawUsers = await instance.search("user", query, allowedProps);

    return rawUsers.map(user => {
        return {
            id: user.ID,
            name: user.name,
            title: user.title,
            email: user.emailAddr
        }
    });
};

module.exports = {
    getUsers
};