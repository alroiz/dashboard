var connect = require('../../app/controllers/connect.server.controller');
var download = require('../../app/controllers/download.server.controller');
var execution = require('../../app/controllers/execution.server.controller');

var express = require('express');
var router = express.Router();

module.exports = function(router) {
	//var router = app.Router();
	var path = require('path');
	/*app.get('/*', function(req, res) {
		if (req.url==="/"){
        	res.sendFile('public/index.html',{ root: path.join(__dirname, '../../') }); // load our public/index.html file
        }else {
			res.sendFile('public'+req.url,{ root: path.join(__dirname, '../../') }); // load other static resources        	
        }
    });   */



	/*
 	* Routes that can be accessed by any one
 	*/
	//router.post('/login', auth.login);
 
	/*
 	* Routes that can be accessed only by autheticated users
 	*/
	router.post('/api/v1/getConnects', connect.getConnects);
	router.post('/api/v1/getDevices', connect.getDevices);
	router.post('/api/v1/getDownloads', download.getDownloads);
	router.post('/api/v1/getDownloadsApp', download.getDownloadsApp);
	router.post('/api/v1/getExecutions', execution.getExecutions);
	router.post('/api/v1/getExecutionsApp', execution.getExecutionsApp);
	/*router.get('/api/v1/product/:id', products.getOne);
	router.post('/api/v1/product/', products.create);
	router.put('/api/v1/product/:id', products.update);
	router.delete('/api/v1/product/:id', products.delete);*/
 
	/*
 	* Routes that can be accessed only by authenticated & authorized users
 	*/
	/*router.get('/api/v1/admin/users', user.getAll);
	router.get('/api/v1/admin/user/:id', user.getOne);
	router.post('/api/v1/admin/user/', user.create);
	router.put('/api/v1/admin/user/:id', user.update);
	router.delete('/api/v1/admin/user/:id', user.delete);*/
	return router;
};

