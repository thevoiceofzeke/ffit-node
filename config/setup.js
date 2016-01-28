var User          = require('../models/user');
var League        = require('../models/league');
var Workout        = require('../models/workout');
var presets		  = require('../presets/presets.json');

// ===========================
// USER DUMP/CREATION SCRIPT
// ===========================
	
	User.find({}, function(err, users) {
	  if (users) {
	  	// dump existing users
	    User.remove({}, function(err) {
	      if (err) throw err;
	      console.log('dumping users');
	      initializeUsers();
	    });
	  }
	});

	function initializeUsers() {
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


// ===========================
// LEAGUE DUMP/CREATION SCRIPT
// ===========================

	League.find({}, function(err, leagues) {
	  if (leagues) {
	    League.remove({}, function(err) {
	      if (err) throw err;
	      console.log('dumping leagues');
	      initializeLeagues();
	    });
	  }
	});

	function initializeLeagues() {
		var league = League({
	      name: 'Admin League',
	      preset: 'ulti-offseason',
	      commissioner: 'admin',
	      leagueMembers: ['admin'],
	      workouts: getPresetWorkouts('ulti-offseason')
	    });
	    league.save(function(err) {
	      if (err) throw err;
	      console.log('Saved league: ' + league.name);
	    });
	}

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
