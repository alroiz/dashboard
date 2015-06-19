<<<<<<< HEAD
var mongoose = require('mongoose')
	//Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/connect.server.schema.js');


module.exports = function() {
	var ConnectSchema = schemas.getConnectSchema();
    var ConnectDailySchema = schemas.getConnectDailySchema();
    var ConnectMonthlySchema =schemas.getConnectMonthlySchema();
    var ConnectYearlySchema = schemas.getConnectYearlySchema();
    mongoose.model('Connect', ConnectSchema);
    mongoose.model('ConnectDaily', ConnectDailySchema);
    mongoose.model('ConnectMonthly', ConnectMonthlySchema);
    mongoose.model('ConnectYearly', ConnectYearlySchema);
   
=======
var mongoose = require('mongoose')
	//Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/connect.server.schema.js');


module.exports = function() {
	var ConnectSchema = schemas.getConnectSchema();
    var ConnectDailySchema = schemas.getConnectDailySchema();
    var ConnectMonthlySchema =schemas.getConnectMonthlySchema();
    var ConnectYearlySchema = schemas.getConnectYearlySchema();
    mongoose.model('Connect', ConnectSchema);
    mongoose.model('ConnectDaily', ConnectDailySchema);
    mongoose.model('ConnectMonthly', ConnectMonthlySchema);
    mongoose.model('ConnectYearly', ConnectYearlySchema);
   
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
}