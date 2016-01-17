var mongoose 				= require('mongoose');
var Schema 					= mongoose.Schema;

// Create league schema
var LeagueSchema = Schema({
	name: { type: String, required: true },
	format: String,
	commissioner: String,
	posts: [],
	leagueMembers: [],
	createdDate: Date,
	updatedDate: Date
});

// Add date on every save
LeagueSchema.pre('save', function(next) {
	// Get current date
	var currentDate = new Date();
	// Change updated_at field to current date
	this.updatedDate = currentDate;
	// If created_at doesn't exist, add to that field
	if (!this.createdDate)
		this.createdDate = currentDate;
	next();
});

// Make model available to app
module.exports = mongoose.model('League', LeagueSchema);