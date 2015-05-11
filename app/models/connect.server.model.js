var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ConnectSchema = new Schema({
	id: String,
	date: { type: Date, default: Date.now },
	mac: String,
	ip: String
});

mongoose.model('Connect', ConnectSchema);