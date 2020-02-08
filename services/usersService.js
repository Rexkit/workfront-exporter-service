const instance = require('../config/workfront');
const ApiConstants = require("workfront-api-constants");
const User = require('../db/models').User;

const getWfUsers = async () => {
    const allowedProps = ['ID', 'name', 'title', 'emailAddr'];
    let query = {};
    query["isActive"] = true;
    query["isActive" + ApiConstants.MOD] = ApiConstants.Operators.EQUAL;
    try {
        const rawUsers = await instance.search("user", query, allowedProps);

        return rawUsers.map(user => {
            return {
                id: user.ID,
                name: user.name,
                title: user.title,
                email: user.emailAddr
            }
        });
    } catch (e) {
        console.log(e);
    }
};

const getWfUsersDB = async (options = {
    attributes: ['id', 'name', 'title', 'email']
}) => {
    try {
        return await User.findAll(options);
    } catch (e) {
        console.log(e);
    }
};

const setWfUsers = async usersArr => {
    if (usersArr) {
        for(const user of usersArr) {
            await User.create(user).catch(err => console.log(err));
        }
    }
};

module.exports = {
    getWfUsers,
    setWfUsers,
    getWfUsersDB
};