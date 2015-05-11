var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ExecutionSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	mac: String,
	ip: String,
	package: String
});

mongoose.model('Execution', ExecutionSchema);