var dashboard = require('../../app/controllers/dashboard.server.controller');
module.exports = function(serverIo) {	
	serverIo.sockets.on('connection', function(socket) {
		socket.on('updateConnect', function(data) {
			dashboard.updateConnect(serverIo);
	        console.log("Me ha llegado un evento updateConnectde un cliente con " + data.id)
	        //socket.emit('testEventResponse', data); // answer back
	    });		
		socket.on('updateNavigation', function(data) {
			dashboard.updateNavigation(serverIo);
	        console.log("Me ha llegado un evento updateNavigation de un cliente con " + data.id)
	        //socket.emit('testEventResponse', data); // answer back
	    });
		socket.on('updateAd', function(data) {
			dashboard.updateAd(serverIo);
	        console.log("Me ha llegado un evento updateAd de un cliente con " + data.id)
	        //socket.emit('testEventResponse', data); // answer back
	    });	
		socket.on('updateExecution', function(data) {
			dashboard.updateExecution(serverIo);
	        console.log("Me ha llegado un evento updateExecution de un cliente con " + data.id)
	        //socket.emit('testEventResponse', data); // answer back
	    });	
		socket.on('updateDownload', function(data) {
			dashboard.updateDownload(serverIo);
	        console.log("Me ha llegado un evento updateDownload de un cliente con " + data.id)
	        //socket.emit('testEventResponse', data); // answer back
	    });	
		dashboard.updateConnect(serverIo);
		dashboard.updateNavigation(serverIo);
		dashboard.updateAd(serverIo);
		dashboard.updateExecution(serverIo);
		dashboard.updateDownload(serverIo);
		
	});	
	
	
}