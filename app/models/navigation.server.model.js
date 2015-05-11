var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NavigationSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	mac: String,
	ip: String,
	menu: String,
	option: String
});

mongoose.model('Navigation', NavigationSchema);