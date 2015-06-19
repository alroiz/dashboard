<<<<<<< HEAD
var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {
  var router = express.Router();
  var app = express();
	//app.use(express.static(__dirname + '/public'));
  app.use(express.static('public'));
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.all('/*', function(req, res, next) {
  		// CORS headers
  		res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  		// Set custom headers for CORS
  		res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  		if (req.method == 'OPTIONS') {
    		res.status(200).end();
  		} else {
    		next();
  		}
	});

	// Auth Middleware - This will check if the token is valid
	// Only the requests that start with /api/v1/* will be checked for the token.
	// Any URL's that do not follow the below pattern should be avoided unless you 
	// are sure that authentication is not needed
	//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);	

	app.use(bodyParser.json());
  //require('../app/routes/index.server.routes.js')(app);
  app.use('/', require('../app/routes/index.server.routes.js')(router));

  return app;
=======
var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {
  var router = express.Router();
  var app = express();
	//app.use(express.static(__dirname + '/public'));
  app.use(express.static('public'));
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.all('/*', function(req, res, next) {
  		// CORS headers
  		res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  		// Set custom headers for CORS
  		res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  		if (req.method == 'OPTIONS') {
    		res.status(200).end();
  		} else {
    		next();
  		}
	});

	// Auth Middleware - This will check if the token is valid
	// Only the requests that start with /api/v1/* will be checked for the token.
	// Any URL's that do not follow the below pattern should be avoided unless you 
	// are sure that authentication is not needed
	//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);	

	app.use(bodyParser.json());
  //require('../app/routes/index.server.routes.js')(app);
  app.use('/', require('../app/routes/index.server.routes.js')(router));

  return app;
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};