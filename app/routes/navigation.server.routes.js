<<<<<<< HEAD
var navigation = require('../../app/controllers/navigation.server.controller');

module.exports = function(app) {
	app.route('/api/stats/navigation').post(navigation.create);
=======
var navigation = require('../../app/controllers/navigation.server.controller');

module.exports = function(app) {
	app.route('/api/stats/navigation').post(navigation.create);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};