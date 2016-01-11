var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create form schema
var formSchema = new mongoose.Schema({
	categories: [],
	pointValues: []
});

// Create model from schema
var ReportingForm = mongoose.model('ReportingForm', formSchema);

// Make model available to app
module.exports = ReportingForm;