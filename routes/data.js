module.exports = passport => {
    const express = require('express');
    const { dataUpdate } = require('../controllers');
    const router = express.Router();

    router.get('/', dataUpdate);

    return router;
};
