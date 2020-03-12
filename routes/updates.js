const express = require('express');
const router = express.Router();

const { getAllUpdates } = require('../controllers');
const isLoggedIn = require('../utils/isLogged');

router.get('/', isLoggedIn, getAllUpdates);

module.exports = router;