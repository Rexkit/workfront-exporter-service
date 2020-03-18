const express = require('express');
const router = express.Router();

const { getAllProjects, getProjectById } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getAllProjects);
router.get('/:id', isLoggedIn, getProjectById);

module.exports = router;