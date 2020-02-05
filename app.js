const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db/models');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const apiRouter = require('./routes')(passport);

app.set('trust proxy', 1);

app.use(session({
    store: new SequelizeStore({
        db: db.sequelize
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

require('./config/passport/passport.js')(passport, db.SystemUser);

module.exports = app;
