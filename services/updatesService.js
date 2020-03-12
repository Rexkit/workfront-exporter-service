const instance = require('../config/workfront');
const Update = require('../db/models').Update;

const replaceDate = require('../utils/replaceDate');
const objectCount = require('../utils/objectsCount');

const getWfUpdates = async (projects) => {
    const projectsIds = projects.map(project => {
        return project.id
    });
    const OBJ_LIMIT = 2000;
    const updates = [];
    const updatesCount = await objectCount("note", {
        topObjID: projectsIds,
        isReply: false
    });

    for (let i = 0; i < updatesCount; i+=OBJ_LIMIT) {
        const updatesCut = await instance.search(
            "note",
            {
                $$FIRST: i,
                $$LIMIT: OBJ_LIMIT,
                topObjID: projectsIds,
                isReply: false
            },
            ["noteText, topObjID, entryDate, ownerID, documentID, replies, replies:noteText, replies:ownerID, replies:entryDate"]
        );
        updates.push(...updatesCut);
    }

    return updates.reduce((result, update) => {
        if (update.noteText !== null) {
            result.push({
                id: update.ID,
                topObjID: update.topObjID,
                noteText: update.noteText,
                ownerId: update.ownerID,
                documentID: update.documentID,
                entryDate: replaceDate(update.entryDate),
                replies: update.replies.length > 0 ? update.replies : null
            });
        }

        return result;
    }, []);
};

const setWfUpdates = async updatesArr => {
    try {
        if (updatesArr) {
            for(const update of updatesArr) {
                await Update.create(update).catch(err => console.log(err));
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

const getDBUpdates = async (options = {
    attributes: [
        'id',
        'topObjID',
        'noteText',
        'ownerId',
        'documentID',
        'entryDate',
        'replies'
    ]
}) => {
    try {
        return await Update.findAll(options);
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    getWfUpdates,
    setWfUpdates,
    getDBUpdates
};