// Require core modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Require routers
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signup');
var timeLineRouter = require('./routes/timeline');

var app = express();

// Initialize firebase
var firebase = require('firebase');
var dbconfig = require('./fbconfig.js');

firebase.initializeApp(dbconfig);

var timelines = firebase.database();

// view engine setup
// Team MOIM will use ejs templates
// http://ejs.co/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/timeline', timeLineRouter);
app.use('/profile', profileRouter);

app.post('/trylogin', (request, response) =>
{
    console.log("Trying login -> ", request.body);
    userdata = request.body;
    userid = userdata.uid;
    userpwd = userdata.pwd;
    firebase.auth().signInWithEmailAndPassword(userid, userpwd).catch(function(error)
    {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        response.send(errorMessage);
        console.log("INVALID USER : ", userdata.uid);
    });
    response.redirect('../timeline');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {next(createError(404));});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
