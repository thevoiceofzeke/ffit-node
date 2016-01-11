/*
  This file should contain all the routes and action necessary to create, update, delete, and retrieve users,
  as well as the routes for authenticating them.
*/
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
  	if (err) throw err;
  	res.json(users);
  });
});

/* CREATE user */
router.post('/', function(req, res, next) {
	var newUser = User({
      name: 'Test User',
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
    });

	res.send('added user ' + req.body.username + '!');
});

/*

	FOR ACTIONS THAT CAN BE USED WITH MONGODB:
		https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

*/

/* FIND user by username */
// router.get('/lookup', function(req, res, next) {
// 	User.find({ username: req.body.username }, function(err, user) {
// 		if (err) throw err;
// 		// DO SOMETHING
// 		res.send('found user: ' + user);
// 	});
// });

/* MODIFY a user's username */
// router.get('/updateusername', function(req, res, next) {
// 	User.findOneAndUpdate({username: req.body.username}, {username: req.body.newUsername}, function(err, user) {
// 		if (err) throw err;
// 		console.log(user);
// 	});
// });


module.exports = router;
