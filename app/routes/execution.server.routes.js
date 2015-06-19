<<<<<<< HEAD
var execution = require('../../app/controllers/execution.server.controller');

module.exports = function(app) {
	app.route('/api/stats/execution').post(execution.create);
=======
var execution = require('../../app/controllers/execution.server.controller');

module.exports = function(app) {
	app.route('/api/stats/execution').post(execution.create);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};