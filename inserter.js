process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
    chance = require('chance');

var db = mongoose();


console.log('Insertando un millón de documents en la colección... Puede tardar unos minutos');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function genMAC(){
    var hexDigits = "0123456789ABCDEF";
    var macAddress="";
    for (var i=0; i<6; i++) {
        macAddress+=hexDigits.charAt(Math.round(Math.random()*16));
        macAddress+=hexDigits.charAt(Math.round(Math.random()*16));
        if (i != 5) macAddress+=":";
    }

    return macAddress;
}

function bulkInsertConnects(){
	var connects=[];
	var connect={};	
	var Connect = require('mongoose').model('Connect');
	for (var j=0;j<1000;j++){
		for (var i=0;i<1000;i++){
			connect={
				id: "portalCVTE.connect",
				date: new Date(randomDate(new Date(2013, 0, 1), new Date())),
				//date: chance().date().toISOString();
				mac: genMAC(),
				ip: chance().ip()
			};
			//console.log (connect);
			connects.push(connect);
			connect={};
		}
	//console.log (connects);
	Connect.collection.insert(connects, onInsert);
	connects=[];
	}
}

function onInsert(err, records) {
    if (err) {
        // TODO: handle error
        console.log(' Error '+ err);
    } else {
    	console.log(records.result.n + ' documents inserted');
        //console.info('%d potatoes were successfully stored.', records.length);
    }
}

bulkInsertConnects();