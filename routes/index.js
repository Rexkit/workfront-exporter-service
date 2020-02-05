let { Router } = require('express');

module.exports = passport => {
    const dataRouter = require('./data')(passport);
    const usersRouter = require('./users');
    const systemAuthRouter = require('./systemAuth')(passport);

    return Router()
        .use('/dataUpdate', dataRouter)
        .use('/users', usersRouter)
        .use('/auth', systemAuthRouter);
};
