var connect = require('../../app/controllers/connect.server.controller');
var device = require('../../app/controllers/device.server.controller');
var download = require('../../app/controllers/download.server.controller');
var execution = require('../../app/controllers/execution.server.controller');

//var express = require('express');
//var router = express.Router();

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
	router.post('/api/v1/getDevices', device.getDevices);
	router.post('/api/v1/getDownloads', download.getDownloads);
	//router.post('/api/v1/getDownloadsApp', download.getDownloadsApp);
	router.post('/api/v1/getExecutions', execution.getExecutions);
	router.post('/api/v1/getExecutionsApp', execution.getExecutionsApp);
	/*router.get('/api/v1/product/:id', products.getOne);
	router.post('/api/v1/product/', products.create);
	router.put('/api/v1/product/:id', products.update);
	router.delete('/api/v1/product/:id', products.delete);*/
 
	/*Predefined reports*/
	router.post('/api/v1/getConnectsToday', connect.getConnectsToday);
	router.post('/api/v1/getConnects30Days', connect.getConnects30days);
	router.post('/api/v1/getConnects365Days', connect.getConnects365days);
	router.post('/api/v1/getConnectsCurrentMonth', connect.getConnectsCurrentMonth);
	router.post('/api/v1/getConnects12months', connect.getConnects12months);
	router.post('/api/v1/getConnectsCurrentYear', connect.getConnectsCurrentYear);
	router.post('/api/v1/getConnects1Year', connect.getConnects1Year);
	router.post('/api/v1/getConnectsVersion', connect.getConnectsVersion);
	
	router.post('/api/v1/getDownloadsToday', download.getDownloadsToday);
	router.post('/api/v1/getDownloads30Days', download.getDownloads30days);
	router.post('/api/v1/getDownloads365Days', download.getDownloads365days);
	router.post('/api/v1/getDownloadsCurrentMonth', download.getDownloadsCurrentMonth);
	router.post('/api/v1/getDownloads12months', download.getDownloads12months);
	router.post('/api/v1/getDownloadsCurrentYear', download.getDownloadsCurrentYear);
	router.post('/api/v1/getDownloads1Year', download.getDownloads1Year);
	router.post('/api/v1/getDownloadsVersion', download.getDownloadsVersion);	
	router.post('/api/v1/getDownloadsApp', download.getDownloadsApp);


	router.post('/api/v1/getExecutionsToday', execution.getExecutionsToday);
	router.post('/api/v1/getExecutions30Days', execution.getExecutions30days);
	router.post('/api/v1/getExecutions365Days', execution.getExecutions365days);
	router.post('/api/v1/getExecutionsCurrentMonth', execution.getExecutionsCurrentMonth);
	router.post('/api/v1/getExecutions12months', execution.getExecutions12months);
	router.post('/api/v1/getExecutionsCurrentYear', execution.getExecutionsCurrentYear);
	router.post('/api/v1/getExecutions1Year', execution.getExecutions1Year);
	router.post('/api/v1/getExecutionsVersion', execution.getExecutionsVersion);	
	router.post('/api/v1/getExecutionsApp', execution.getExecutionsApp);
	
	router.post('/api/v1/getDevices', device.getDevicesToday);
	
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

