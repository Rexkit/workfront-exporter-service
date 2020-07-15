const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db/models');
require('dotenv').config();
const cron = require('cron').CronJob;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dataUpdateCron =  require('./crons/dataUpdate');
const app = express();
const apiRouter = require('./routes')(passport);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
app.use(session({
    store: new SequelizeStore({
        db: db.sequelize
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.disable('etag');

app.use('/api', apiRouter);

require('./config/passport/passport.js')(passport, db.SystemUser);

dataUpdateCron.start();

module.exports = app;
