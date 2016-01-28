var mongoose 				= require('mongoose');
var Schema 					= mongoose.Schema;

// Create league schema
var WorkoutSchema = Schema({
	name: { type: String, required: true },
	points: { type: Number, required: true},
	description_long: String,
	description_short: String
});

// Make model available to app
module.exports = mongoose.model('Workout', WorkoutSchema);