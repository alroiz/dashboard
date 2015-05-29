var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
    chance = require('chance');

var db = mongoose();

mongoose.connection.db.dropCollection('connect', function(err, result) {
	console.log ("connect collection removed");
});

mongoose.connection.db.dropCollection('connectdailies', function(err, result) {
	console.log ("connectdailies collection removed");
});