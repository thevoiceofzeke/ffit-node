var express = require('express');
var passport = require('passport');
var League = require('../models/league');
var Scorecard = require('../models/scorecard');
var router = express.Router();

// =========================
// HOMEPAGE ROUTES
// =========================
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// =========================
// NAVIGATION ROUTES
// These will become obsolete upon choosing a front-end technology
// =========================
router.get('/addUser', function(req, res, next) {
	res.render('addUser', { title: 'Add User' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.get('/profile/:user', function(req, res, next) {
  res.render('profile', { title: req.params.user });
});

// =========================
// LEAGUE ROUTES
// =========================
/* GET find all leagues */
router.get('/leagues', function(req, res, next) {
  League.find({}, function(err, league) {
  	if (err) throw err;
  	res.json(league);
  });
});

/* GET find league by id */
router.get('/leagues/:id', function(req, res, next) {
	League.find({ _id: req.params.id }, function(err, league) {
		if (err) throw err;
		res.json(league);
	});
});

/* POST create a new league */
router.post('/leagues', function(req, res, next) {
	var newLeague = League({
      name: 'Test League',
      format: req.body.format,
      commissioner: req.body.commissioner,
      members: req.body.commissioner
    });

    newLeague.save(function(err) {
      if (err) throw err;
      console.log('League created!');
    });

	res.json('Created League: ' + newLeague + '!');
})

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
