// ======================================
// Packages/dependencies
// ======================================
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');

var passport      = require('passport');
var flash         = require('connect-flash');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// MODELS
var presets       = require('./presets/presets'), json;
var db            = require('./models/db');
var User          = require('./models/user');
var League        = require('./models/league');
var leagueMember  = require('./models/leagueMember');

// ROUTES
var api 		      = require('./routes/api');
var routes        = require('./routes/index');
var users         = require('./routes/users');
var leagues       = require('./routes/leagues');

// DEV ENVIRONMENT SETUP
var setupScript	  =	require('./config/setup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// Use body parser to get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// ==========================
// Initialize authorization
// ==========================
app.use(require('express-session')({
    secret: 'ffit-node',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/leagues', leagues);

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
