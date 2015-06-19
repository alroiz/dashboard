<<<<<<< HEAD
var connect = require('../../app/controllers/connect.server.controller');

module.exports = function(app) {
	app.route('/api/stats/connect').post(connect.create);
=======
var connect = require('../../app/controllers/connect.server.controller');

module.exports = function(app) {
	app.route('/api/stats/connect').post(connect.create);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};