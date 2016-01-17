var mongoose 				= require('mongoose');
var Schema 					= mongoose.Schema;

// Create form schema
var LeagueMemberSchema = Schema({
	leagueId: String,
	memberId: String
});

// Make model available to app
module.exports = mongoose.model('LeagueMember', LeagueMemberSchema);