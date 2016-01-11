var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create user schema
var userSchema = new mongoose.Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: Boolean,
	leagueMember: [],
	leagueCommissioner: [],
	createdDate: Date,
	updatedDate: Date
});

// Add date on every save
// In future, use this to hash passwords to avoid saving plain text passwords
userSchema.pre('save', function(next) {
	// Get current date
	var currentDate = new Date();

	// Change updated_at field to current date
	this.updatedDate = currentDate;

	// If createdDate doesn't exist, add to that field
	if (!this.createdDate)
		this.createdDate = currentDate;

	next();
});

// Create model from schema
var User = mongoose.model('User', userSchema);

// Make model available to app
module.exports = User;