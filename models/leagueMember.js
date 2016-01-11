var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create form schema
var leagueMemberSchema = new mongoose.Schema({
	leagueId: String,
	memberId: String
});

// Create model from schema
var LeagueMember = mongoose.model('LeagueMember', leagueMemberSchema);

// Make model available to app
module.exports = LeagueMember;