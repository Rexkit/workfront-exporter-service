const { getDBDocuments, getDBDocumentById } = require('../services');

const getAllDocuments = async (req, res, next) => {
    try {
        const documents = await getDBDocuments();
        res.json(documents);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

const getDocumentById = async (req, res, next) => {
    const documentId = req.params.id;
    try {
        const document = await getDBDocumentById(documentId);
        res.json(document);
        next();
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
};

module.exports = {
    getAllDocuments,
    getDocumentById
};
