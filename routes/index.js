var express = require('express');
var passport = require('passport');
var League = require('../models/league');
var Scorecard = require('../models/scorecard');
var User = require('../models/user');
var Account = require('../models/account');
var router = express.Router();

// =========================
// HOMEPAGE ROUTES
// =========================
router.get('/', function(req, res, next) {
	res.render('index', { user : req.user });

});
// =========================
// NAVIGATION ROUTES
// These will become obsolete upon choosing a front-end technology
// =========================
router.get('/addUser', function(req, res, next) {
	if (req.user.admin) {
		res.render('addUser', { user: req.user });
	} else {
		res.send('You do not have permission to view this page.');
	}
});
router.get('/profile/:user', function(req, res, next) {
  res.render('profile', { title: req.params.user });
});

// =========================
// AUTHENTICATION ROUTES
// =========================
router.get('/register', function(req, res) {
    res.render('register', { });
});
router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username, admin : req.body.admin}), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
// router.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

// =========================
// LEAGUE ROUTES
// =========================

/* GET find league by owner */
router.get('/leagues/:user', function(req, res, next) {
	League.find({ commissioner: req.params.user }, function(err, league) {
		if (err) throw err;
		res.json(league);
	});
});

/* GET create league page */
router.get('/create', function(req, res, next) {
	res.render('createLeague', { user: req.user });
});
/* GET member invite page */
// router.get('/invite', function(req, res, next) {
// 	res.render('invite', { user: req.user });
// })

// =========================
// POST ROUTES
// =========================

// =========================
// FORM ROUTES
// =========================

// =========================
// SCORECARD ROUTES
// =========================
/* GET find the scorecard from the specified date */
// ^this must only occur for the authenticated user...


module.exports = router;
