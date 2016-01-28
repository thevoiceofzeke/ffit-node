/*
  This file should contain all the routes and action necessary to create, update, delete, and retrieve users,
  as well as the routes for authenticating them.
*/
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

//===========================//
//       /USERS ROUTES       //
//===========================//
router.route('/')
  
  /*
    Get all users
    Accessed at GET http://localhost:3000/api/users
  */
  .get(function(req, res) {
      User.find({}, function(err, users) {
        if (err)
          res.send(err);
        res.json(users);
      });
  })

  /*
    Create a new user
    Accessed at POST http://localhost:3000/api/users
  */
  .post(function(req, res) {
    var newUser = User({
          username: req.body.username,
          password: req.body.password
      });

      newUser.save(function(err) {
          if (err)
              res.send(err);
          console.log('User created!');
      });

      res.json({ message: 'added user ' + req.body.username + '!' });
  });

//===========================//
//  /USERS/:USER_ID ROUTES   //
//===========================//
router.route('/:user_id')

  /*
    Get a user by id
    Accessed at GET http://localhost:3000/api/users/:user_id
  */
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })
  /*
    Update a user by id
    Accessed at PUT http://localhost:3000/api/users/:user_id
  */
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

      user.name = req.body.name;
      user.username = req.body.username;

      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User updated!' });
      });
    });
  })

  /*
    Delete user with id
    Accessed at DELETE http://localhost:3000/api/users/:user_id
  */
  .delete(function(req, res) {
      User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err)
          res.send(err);
        res.json({ message: 'Deleted user: ' + user });
      });
  });

//===========================//
//   AUTHENTICATION ROUTES   //
//===========================//
router.route('/register')
  
    .post(function(req, res) {
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                return res.render('register', { user : user });
            }
            user.save(function(err) {
                if (err)
                    res.send(err);
                console.log('User created!');
            });
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

router.route('/login')
    /*
        Login as user
    */
    .post(passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

router.route('/registernoredirect')

    .post(function(req, res) {
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                return res.render('register', { user : user });
            }
            user.save(function(err) {
                if (err)
                    res.send(err);
                console.log('User created!');
            });
        });
    });

/*
	FOR ACTIONS THAT CAN BE USED WITH MONGODB:
	https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

module.exports = router;
