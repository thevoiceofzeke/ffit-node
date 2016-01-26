var User          = require('../models/user');
var League        = require('../models/league');

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
	      format: 'Standard',
	      commissioner: 'admin',
	      leagueMembers: []
	    });
	    league.save(function(err) {
	      if (err) throw err;
	      console.log('Saved league: ' + league.name);
	    });
	}

