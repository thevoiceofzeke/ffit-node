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

var db            = require('./models/db');
var User          = require('./models/user');
var League        = require('./models/league');
var leagueMember  = require('./models/leagueMember');
var routes        = require('./routes/index');
var users         = require('./routes/users');

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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

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

// ===========================
// USER DUMP/CREATION SCRIPT
// ===========================
User.find({}, function(err, users) {
  if (users) {
  	// dump existing users
    User.remove({}, function(err) {
      if (err) throw err;
      console.log('dumping users');
    });
    // register admin user
    User.register(new User({ username : 'admin', admin : true}), 'admin', function(err, user) {
        if (err) throw err;
        console.log('registered user: ' + user.username);
        user.save(function(err) {
          if (err) throw err;
          console.log('Saved user: ' + user.username);
        });
    });
    // assign admin to a league
    
    // register non-admin user
    User.register(new User({ username : 'notAdmin', admin : false}), 'notAdmin', function(err, user) {
        if (err) throw err;
        console.log('registered user: ' + user.username);
        user.save(function(err) {
          if (err) throw err;
          console.log('Saved user: ' + user.username);
        });
    });
  }
});
// ===========================
// LEAGUE DUMP/CREATION SCRIPT
// ===========================
League.find({}, function(err, leagues) {
  if (leagues) {
    League.remove({}, function(err) {
      if (err) throw err;
      console.log('dumping leagues');
    });
    var league = League({
      name: 'Admin League',
      format: 'Standard',
      commissioner: 'admin',
      leagueMembers: []
    });
    league.save(function(err) {
      if (err) throw err;
      console.log('Saved league: ' + league.name);
    });
  }
});
// User.find({}, function(err, users) {
//   if (err) throw err;
//   if (users) {
//     User.remove({}, function(err) {
//       if (err) throw err;
//       console.log('dumping users');
//     });
//     var admin = User({
//       name: 'Admin User',
//       username: 'admin',
//       password: 'admin',
//       admin: true
//     });
//     var notAdmin = User({
//       name: 'Test User',
//       username: 'notAdmin',
//       password: 'notAdmin',
//       admin: false
//     });
//     admin.save(function(err) {
//       if (err) throw err;
//       console.log('saving user: ' + admin.name);
//     });
//     notAdmin.save(function(err) {
//       if (err) throw err;
//       console.log('saving user: ' + notAdmin.name);
//     });
//   }
// });

module.exports = app;
