const express = require('express');
const router = express.Router();

const { getAllDocuments, getDocumentById } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getAllDocuments);
router.get('/:id', isLoggedIn, getDocumentById);

module.exports = router;