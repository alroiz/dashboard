var mongoose = require('mongoose'),
    //Schema = mongoose.Schema
    schemas=require('./schemas/download.server.schema.js');

module.exports = function() {
    var DownloadSchema = schemas.getDownloadSchema();
    var DownloadDailySchema = schemas.getDownloadDailySchema();
    var DownloadMonthlySchema =schemas.getDownloadMonthlySchema();
    var DownloadYearlySchema = schemas.getDownloadYearlySchema();   

    mongoose.model('Download', DownloadSchema);
    mongoose.model('DownloadDaily', DownloadDailySchema);
    mongoose.model('DownloadMonthly', DownloadMonthlySchema);
    mongoose.model('DownloadYearly', DownloadYearlySchema);
}