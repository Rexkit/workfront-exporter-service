const instance = require('../config/workfront');
const Document = require('../db/models').Document;

const replaceDate = require('../utils/replaceDate');
const objectCount = require('../utils/objectsCount');

const getWfDocuments = async (projects) => {
    const projectsIds = projects.map(project => {
        return project.id
    });

    const OBJ_LIMIT = 2000;
    const documents = [];
    const documentsCount = await objectCount("docu");

    for (let i = 0; i < documentsCount; i+=OBJ_LIMIT) {
        const documentsCut = await instance.search(
            "docu",
            {
                $$FIRST: i,
                $$LIMIT: OBJ_LIMIT,
                projectID: projectsIds
            },
            ['name, ownerID, downloadURL, lastModDate, projectID']
        );
        documents.push(...documentsCut);
    }

    return documents.reduce((result, document) => {
        if (document.noteText !== null) {
            result.push({
                id: document.ID,
                name: document.name,
                ownerID: document.ownerID,
                projectID: document.projectID,
                downloadURL: document.downloadURL,
                lastModDate: replaceDate(document.lastModDate)
            });
        }

        return result;
    }, []);
};

const setWfDocuments = async documentsArr => {
    try {
        if (documentsArr) {
            for(const document of documentsArr) {
                await Document.create(document).catch(err => console.log(err));
            }
            console.log('Successfully set documents to DB');
        } else {
            console.log('No documents were specified for set operation');
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

const getDBDocuments = async (options = {
    attributes: [
        'id',
        'name',
        'ownerID',
        'downloadURL',
        'lastModDate',
        'projectID'
    ]
}) => {
    try {
        return await Document.findAll(options);
    } catch (e) {
        throw new Error(e.message);
    }
};

const getDBDocumentById = async id => {
    try {
        return await Document.findByPk(id);
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    getWfDocuments,
    setWfDocuments,
    getDBDocuments,
    getDBDocumentById
};