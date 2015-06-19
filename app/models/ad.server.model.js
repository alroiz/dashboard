var mongoose = require('mongoose')
    //Schema = mongoose.Schema;
var util = require('util');     
var schemas=require('./schemas/ad.server.schema.js');

module.exports = function() {
    var AdSchema = schemas.getAdSchema();
    var AdDailySchema = schemas.getAdDailySchema();
    var AdMonthlySchema = schemas.getAdMonthlySchema();
    var AdYearlySchema = schemas.getAdYearlySchema();

    mongoose.model('Ad', AdSchema);
    mongoose.model('AdDaily', AdDailySchema);
    mongoose.model('AdMonthly', AdMonthlySchema);
    mongoose.model('AdYearly', AdYearlySchema);
};