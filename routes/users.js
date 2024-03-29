const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getUsers);

module.exports = router;