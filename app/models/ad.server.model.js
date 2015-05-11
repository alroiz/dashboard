var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	mac: String,
	ip: String,
	banner: String
});

mongoose.model('Ad', AdSchema);