var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DownloadSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	mac: String,
	ip: String,
	package: String,
	type: String
});

mongoose.model('Download', DownloadSchema);