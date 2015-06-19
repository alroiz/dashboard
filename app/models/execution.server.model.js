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
}