var mongoose 				= require('mongoose');
var Schema 					= mongoose.Schema;
var passportLocalMongoose 	= require('passport-local-mongoose');

// Create user schema
var User = new Schema({
	username: String,
    password: String,
	admin: Boolean,
	name: String,
	leagueMember: [],
	leagueCommissioner: [],
	createdDate: Date,
	updatedDate: Date
});

// Add date on every save
User.pre('save', function(next) {
	// Get current date
	var currentDate = new Date();

	// Change updated_at field to current date
	this.updatedDate = currentDate;

	// If createdDate doesn't exist, add to that field
	if (!this.createdDate)
		this.createdDate = currentDate;

	next();
});

User.plugin(passportLocalMongoose);


// Make model available to app
module.exports = mongoose.model('User', User);