module.exports = passport => {
    const express = require('express');
    const { dataUpdate } = require('../controllers');
    const isLoggedIn = require('../utils/isLogged');
    const router = express.Router();

    router.get('/', isLoggedIn, dataUpdate);

    return router;
};
