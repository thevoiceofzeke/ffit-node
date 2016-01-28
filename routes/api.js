var express = require('express');
var passport = require('passport');
var League = require('../models/league');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'You have reached the ffit-node api' });
});

module.exports = router;