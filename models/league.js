var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create league schema
var leagueSchema = new mongoose.Schema({
	name: { type: String, required: true },
	format: String,
	commissioner: String,
	posts: [],
	members: [],
	createdDate: Date,
	updatedDate: Date
});

// Add date on every save
leagueSchema.pre('save', function(next) {
	// Get current date
	var currentDate = new Date();
	// Change updated_at field to current date
	this.updatedDate = currentDate;
	// If created_at doesn't exist, add to that field
	if (!this.createdDate)
		this.createdDate = currentDate;
	next();
});

// Create model from schema
var League = mongoose.model('League', leagueSchema);

// Make model available to app
module.exports = League;