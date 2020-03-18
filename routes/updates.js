const express = require('express');
const router = express.Router();

const { getAllUpdates, getUpdatesByProjectId } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getAllUpdates);
router.get('/:id', isLoggedIn, getUpdatesByProjectId);

module.exports = router;