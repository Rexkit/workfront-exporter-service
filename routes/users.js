const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/users', isLoggedIn, getUsers);

module.exports = router;