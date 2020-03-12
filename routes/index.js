let { Router } = require('express');

module.exports = passport => {
    const dataRouter = require('./data')(passport);
    const usersRouter = require('./users');
    const systemAuthRouter = require('./systemAuth')(passport);
    const projectsRouter = require('./projects');
    const updatesRouter = require('./updates');

    return Router()
        .use('/dataUpdate', dataRouter)
        .use('/users', usersRouter)
        .use('/auth', systemAuthRouter)
        .use('/projects', projectsRouter)
        .use('/updates', updatesRouter);
};
