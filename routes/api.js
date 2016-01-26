var express = require('express');
var passport = require('passport');
var League = require('../models/league');
var Scorecard = require('../models/scorecard');
var User = require('../models/user');
var Account = require('../models/account');
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening...');
	next();
});
router.get('/', function(req, res) {
	res.json({ message: 'You have reached the ffit-node api' });
});

//===========================//
// 		/LEAGUES ROUTES		 //
//===========================//
router.route('/leagues')
	
	/*
		Get all league
		Accessed at GET http://localhost:3000/api/leagues
	*/
	.get(function(req, res) {
  		League.find({}, function(err, league) {
  			if (err)
  				res.send(err);
  			res.json(league);
  		});
	})
	/*
		Create a league
		Accessed at POST http://localhost:3000/api/leagues
	*/
	.post(function(req, res) {
		var league = new League();		// create new instance of League model
		league.name = req.body.name 	// set league's name (comes from HTTP request)

		// save the league and check for errors
		league.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'League created with name: ' + league.name });
		});
	});

//===========================//
//	/LEAGUES/:LEAGUE ROUTES	 //
//===========================//
router.route('/leagues/:league_id')

	/*
		Get a league by id
		Accessed at GET http://localhost:3000/api/leagues/:league_id
	*/
	.get(function(req, res) {
		League.findById(req.params.league_id, function(err, league) {
			if (err)
				res.send(err);
			res.json(league);
		});
	})
	/*
		Update a league by id
		Accessed at PUT http://localhost:3000/api/leagues/:league_id
	*/
	.put(function(req, res) {
		League.findById(req.params.league_id, function(err, league) {
			if (err)
				res.send(err);
			
			league.name = req.body.name;
			league.format = req.body.format;
			league.commissioner = req.body.commissioner;

			league.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'League updated!' });
			});
		});
	})

	/*
		Delete league with id
		Accessed at DELETE http://localhost:3000/api/leagues/:league_id
	*/
	.delete(function(req, res) {
  		League.remove({ _id: req.params.league_id }, function(err, league) {
    		if (err)
    			res.send(err);
    		res.json({ message: 'Deleted league: ' + league });
  		});
	});






module.exports = router;