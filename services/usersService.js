const instance = require('../config/workfront');
const ApiConstants = require("workfront-api-constants");
const User = require('../db/models').User;

const objectCount = require('../utils/objectsCount');

const getWfUsers = async () => {
    const OBJ_LIMIT = 2000;
    const users = [];
    const usersCount = await objectCount("user");
    const allowedProps = ['ID', 'name', 'title', 'emailAddr'];
    // query["isActive"] = true;
    // query["isActive" + ApiConstants.MOD] = ApiConstants.Operators.EQUAL;
    try {
        for (let i = 0; i < usersCount; i+=OBJ_LIMIT) {
            const usersCut = await instance.search(
                "user",
                {
                    $$FIRST: i,
                    $$LIMIT: OBJ_LIMIT
                },
                allowedProps
            );
            users.push(...usersCut);
        }

        return users.map(user => {
            return {
                id: user.ID,
                name: user.name,
                title: user.title,
                email: user.emailAddr
            }
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

const getDBUsers = async (options = {
    attributes: ['id', 'name', 'title', 'email']
}) => {
    try {
        return await User.findAll(options);
    } catch (e) {
        throw new Error(e.message);
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
    getDBUsers
};