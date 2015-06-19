<<<<<<< HEAD
var download = require('../../app/controllers/download.server.controller');

module.exports = function(app) {
	app.route('/api/stats/download').post(download.create);
=======
var download = require('../../app/controllers/download.server.controller');

module.exports = function(app) {
	app.route('/api/stats/download').post(download.create);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};