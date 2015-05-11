var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
    require('../app/routes/index.server.routes.js')(app);
    return app;
};