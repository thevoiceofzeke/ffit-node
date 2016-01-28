var express 		= require('express');
var passport 		= require('passport');
var presets       	= require('../presets/presets'), json;
var League 			= require('../models/league');
var User 			= require('../models/user');
var Workout 		= require('../models/workout');
var router 			= express.Router();


//===========================//
// 		/LEAGUES ROUTES		 //
//===========================//
router.route('/')
	
	/*
		Get all leagues
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
		league.name = req.body.name; 	// set league's info (comes from HTTP request)
		league.preset = req.body.preset;
		league.commissioner = req.body.commissioner;
		league.leagueMembers = [req.body.commissioner];
		league.workouts = getPresetWorkouts(league.preset);

		// save the league and check for errors
		league.save(function(err) {
			if (err)
				res.send(err);
			var code = encodeURIComponent(league.name);
			res.redirect('/create?created=' + code);
		});
	});

//===========================//
//		/:LEAGUE ROUTES	 	 //
//===========================//
router.route('/:league_id')

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

//===========================//
//  	/:COMMISH ROUTES 	 //
//===========================//
router.route('/:commissioner')

	/*
		Get a league by commissioner
		Accessed at GET http://localhost:3000/api/leagues/:commissioner
	*/
	.get(function(req, res) {
		League.find({ commissioner: req.params.commissioner }, function(err, league) {
			if (err)
				res.send(err);
			res.json(league);
		});
	});


//===========================//
//  	  JSON PARSING 	     //
//===========================//
function getPresetWorkouts(preset) {
	var workouts = [];
	for (var i = 0; i < presets.length; i++) {
		if (presets[i].presetType == preset) {
			var jsonWorkouts = presets[i].workouts;
			for (jsonWorkout of jsonWorkouts) {
				var workout = new Workout();
				workout.name = jsonWorkout.name;
				workout.points = jsonWorkout.points;
				workout.description_long = jsonWorkout.description_long;
				workout.description_short = jsonWorkout.description_short;
				workouts.push(workout);
			}
		}
	}
	return workouts;
}


module.exports = router;