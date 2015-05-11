var io = require('socket.io');

module.exports = function(server) {

	var serv_io=io.listen(server); // this tells socket.io to use our express server

	//A partir de aquí se tratan como las rutas
    require('../app/events/dashboard.server.event.js')(serv_io);
    return serv_io;
};