<<<<<<< HEAD
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	io = require('./config/socket.io')
var db = mongoose(),
	app = express();

//var server=app.listen(config.port);
var server=app.listen(process.env.PORT || 3002)
var serv_io=io(server);

module.exports = app;


console.log(process.env.NODE_ENV  + ' server dashboard running at http://localhost:' + config.port);
=======
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	io = require('./config/socket.io')
var db = mongoose(),
	app = express();

//var server=app.listen(config.port);
var server=app.listen(process.env.PORT || 3002)
var serv_io=io(server);

module.exports = app;


console.log(process.env.NODE_ENV  + ' server dashboard running at http://localhost:' + config.port);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
