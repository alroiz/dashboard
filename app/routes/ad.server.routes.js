<<<<<<< HEAD
var ad = require('../../app/controllers/ad.server.controller');

module.exports = function(app) {
	app.route('/api/stats/ad').post(ad.create);
=======
var ad = require('../../app/controllers/ad.server.controller');

module.exports = function(app) {
	app.route('/api/stats/ad').post(ad.create);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
};