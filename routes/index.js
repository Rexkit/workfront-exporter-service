let { Router } = require('express');

const dataRouter = require('./data');
const usersRouter = require('./users');

let apiRouter = Router()
    .use('/dataUpdate', dataRouter)
    .use('/users', usersRouter);

module.exports = apiRouter;
