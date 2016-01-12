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
      password: req.body.password,
      admin: req.body.admin
    });

    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
    });

	res.send('added user ' + req.body.username + '!');
});

/* DELETE all users */
router.delete('/', function(req, res, next) {
  User.remove({}, function(err) {
    if (err) throw err;
    console.log('removed users');
  });
});

/*
	FOR ACTIONS THAT CAN BE USED WITH MONGODB:
	https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

module.exports = router;
