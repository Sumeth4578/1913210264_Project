var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const config = require('./config/index')
const passport = require('passport')
const errorHandle = require('./middleware/errorHandle')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var branchRouter = require('./routes/branch');
var staffRouter = require('./routes/staff');

var app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/branch', branchRouter);
app.use('/staff', staffRouter);

app.use(errorHandle)
module.exports = app;
