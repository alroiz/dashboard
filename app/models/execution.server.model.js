<<<<<<< HEAD
var mongoose = require('mongoose'),
	//Schema = mongoose.Schema
	schemas=require('./schemas/execution.server.schema.js');


module.exports = function(socketIoClient) {
	var ExecutionSchema = schemas.getExecutionSchema();
    var ExecutionDailySchema = schemas.getExecutionDailySchema();
    var ExecutionMonthlySchema =schemas.getExecutionMonthlySchema();
    var ExecutionYearlySchema = schemas.getExecutionYearlySchema();		

    mongoose.model('Execution', ExecutionSchema);
    mongoose.model('ExecutionDaily', ExecutionDailySchema);
    mongoose.model('ExecutionMonthly', ExecutionMonthlySchema);
    mongoose.model('ExecutionYearly', ExecutionYearlySchema);
=======
var mongoose = require('mongoose'),
	//Schema = mongoose.Schema
	schemas=require('./schemas/execution.server.schema.js');


module.exports = function(socketIoClient) {
	var ExecutionSchema = schemas.getExecutionSchema();
    var ExecutionDailySchema = schemas.getExecutionDailySchema();
    var ExecutionMonthlySchema =schemas.getExecutionMonthlySchema();
    var ExecutionYearlySchema = schemas.getExecutionYearlySchema();		

    mongoose.model('Execution', ExecutionSchema);
    mongoose.model('ExecutionDaily', ExecutionDailySchema);
    mongoose.model('ExecutionMonthly', ExecutionMonthlySchema);
    mongoose.model('ExecutionYearly', ExecutionYearlySchema);
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
}