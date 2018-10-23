// Require core modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Require routers
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var settingRouter = require('./routes/setting');
var loginRouter = require('./routes/login');
var signUpRouter = require('./routes/signup');
var timeLineRouter = require('./routes/timeline');
var mobiletimelineRouter = require('./routes/mobiletimeline');
var gpsmapRouter = require('./routes/gpsmap');
var app = express();

// Initialize firebase
var firebase = require('firebase');
var dbconfig = require('./fbconfig.js');

firebase.initializeApp(dbconfig);

var timelines = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/setting', settingRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/timeline', timeLineRouter);
app.use('/mobiletimeline', mobiletimelineRouter);
app.use('/gpsmap', gpsmapRouter);

app.post('/trysignup', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });

    res.redirect('/');
});

app.post('/trylogin', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
    {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        response.send(errorMessage);
        console.log("INVALID USER : ", userdata.uid);
    });

    var user = firebase.auth().currentUser;
    console.log(user);

    response.redirect('/profile');
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
