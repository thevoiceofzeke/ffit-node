var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create post schema
var postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	text: String,
	author: String,
	createdDate: Date,
	updatedDate: Date
});

// Add date on every save
postSchema.pre('save', function(next) {
	// Get current date
	var currentDate = new Date();
	// Change updatedDate field to current date
	this.updatedDate = currentDate;
	// If createdDate doesn't exist, add to that field
	if (!this.createdDate)
		this.createdDate = currentDate;
	next();
});

// Create model from schema
var Post = mongoose.model('Post', postSchema);

// Make model available to app
module.exports = Post;