var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	require('../app/models/navigation.server.model')();	
	require('../app/models/connect.server.model')();
	require('../app/models/ad.server.model')();
	require('../app/models/execution.server.model')();
	require('../app/models/download.server.model')();
	return db;
};