module.exports = function(app) {
	var path = require('path');
	app.get('/*', function(req, res) {
		if (req.url==="/"){
        	res.sendFile('public/index.html',{ root: path.join(__dirname, '../../') }); // load our public/index.html file
        }else {
			res.sendFile('public'+req.url,{ root: path.join(__dirname, '../../') }); // load other static resources        	
        }
    });    
};