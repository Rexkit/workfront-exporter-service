const express = require('express');
const router = express.Router();

const { getAllProjects } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getAllProjects);

module.exports = router;