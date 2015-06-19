var mongoose = require('mongoose')
    //Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/navigation.server.schema.js');

module.exports = function(socketIoClient) {
    var NavigationSchema = schemas.getNavigationSchema();
    var NavigationDailySchema = schemas.getNavigationDailySchema();
    var NavigationMonthlySchema =schemas.getNavigationMonthlySchema();
    var NavigationYearlySchema = schemas.getNavigationYearlySchema();   

    mongoose.model('Navigation', NavigationSchema);
    mongoose.model('NavigationDaily', NavigationDailySchema);
    mongoose.model('NavigationMonthly', NavigationMonthlySchema);
    mongoose.model('NavigationYearly', NavigationYearlySchema);
}