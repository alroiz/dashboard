var Connect = require('mongoose').model('Connect');
var Navigation = require('mongoose').model('Navigation');
var Ad = require('mongoose').model('Ad');
var Execution = require('mongoose').model('Execution');
var Download = require('mongoose').model('Download');

exports.getConnection = function(socket) {	
	console.log("Se ha conectado un cliente");
};

exports.updateConnect = function(socket) {	
 	//var stream = Connect.find({ date: { $gt: startDate, $lt: endDate } }).stream();
	var end = new Date();
	var start = new Date();
	start.setHours(end.getHours() - 1);

	var startDate = start.toISOString();
	var endDate = end.toISOString();
	//var stream=Connect.find({ date: { $gt: startDate, $lt: endDate } }).stream();
	
	Connect.find({ date: { $gt: startDate, $lt: endDate } },function(err,ads){
		socket.emit("updateConnectResponse", ads);
	});
	
	/*var stream = Connect.aggregate([
    	{ $match: { date: { $gt: startDate, $lt: endDate } } },
    	{ $group: { mac: "$mac", count: { $sum: '$mac' } } }
	]).stream();*/
    
    /*stream.on('error', function (err) {
      console.error(err)
    });

    stream.on('data', function (doc) {
    	//console.log ("He obtenido resultados");
    	console.log ("He obtenido resultados desde updateConnect y emito respuesta");
      	socket.emit("updateConnectResponse", doc);
    }); */
};

exports.updateNavigation = function(socket) {	
	//console.log("He llegado desde el server de stats");
	var end = new Date();
	var start = new Date();
	start.setHours(end.getHours() - 1);

	var startDate = start.toISOString();
	var endDate = end.toISOString();
	//var stream=Navigation.find({ date: { $gt: startDate, $lt: endDate } }).stream();

   
   /* stream.on('error', function (err) {
      console.error(err)
    });

    stream.on('data', function (doc) {
    	console.log ("He obtenido resultados desde updateNavigation y emito respuesta");
      	socket.emit("updateNavigationResponse", doc);
    }); */
    
    Navigation.find({ date: { $gt: startDate, $lt: endDate } },function(err,navigations){
		socket.emit("updateNavigationResponse", navigations);
	});    
};

exports.updateAd = function(socket) {	
	//console.log("A punto de ejecutar la query");
	var end = new Date();
	var start = new Date();
	start.setHours(end.getHours() - 1);

	var startDate = start.toISOString();
	var endDate = end.toISOString();
	//var stream=Ad.find({ date: { $gt: startDate, $lt: endDate } }).stream();
	Ad.find({ date: { $gt: startDate, $lt: endDate } },function(err,ads){
		socket.emit("updateAdResponse", ads);
	});

   
    /*stream.on('error', function (err) {
      console.error(err)
    });

    stream.on('data', function (doc) {
    	console.log ("He obtenido resultados desde updateAd y emito respuesta");
      	socket.emit("updateAdResponse", doc);
    }); */
	
};


exports.updateExecution = function(socket) {	
	//console.log("He llegado desde el server de stats");
	var end = new Date();
	var start = new Date();
	start.setHours(end.getHours() - 1);

	var startDate = start.toISOString();
	var endDate = end.toISOString();
	
	Execution.find({ date: { $gt: startDate, $lt: endDate } },function(err,ads){
		socket.emit("updateExecutionResponse", ads);
	});
	
	//var stream=Execution.find({ date: { $gt: startDate, $lt: endDate } }).stream();

   /* stream.on('error', function (err) {
      console.error(err)
    });

    stream.on('data', function (doc) {
    	console.log ("He obtenido resultados desde updatExecution y emito respuesta");
      	socket.emit("updateExecutionResponse", doc);
    }); */
};


exports.updateDownload = function(socket) {	
	//console.log("He llegado desde el server de stats");
	var end = new Date();
	var start = new Date();
	start.setHours(end.getHours() - 1);

	var startDate = start.toISOString();
	var endDate = end.toISOString();
	//var stream=Download.find({ date: { $gt: startDate, $lt: endDate } }).stream();
	Download.find({ date: { $gt: startDate, $lt: endDate } },function(err,ads){
		socket.emit("updateDownloadResponse", ads);
	});
   
    /*stream.on('error', function (err) {
      console.error(err)
    });

    stream.on('data', function (doc) {
    	console.log ("He obtenido resultados desde updateDownload y emito respuesta");
      	socket.emit("updateDownloadResponse", doc);
    }); */
};

