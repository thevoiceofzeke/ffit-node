var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create scorecard schema
var scorecardSchema = new mongoose.Schema({
	owner: { type: String, required: true },
	startDate: Date,
	endDate: Date
});

// Create model from schema
var Scorecard = mongoose.model('Scorecard', scorecardSchema);

// Make model available to app
module.exports = Scorecard;