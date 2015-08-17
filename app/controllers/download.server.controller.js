var util = require('util');

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function _monthName(m){
  var month = new Array();
  month[0] = "Enero";
  month[1] = "Febrero";
  month[2] = "Marzo";
  month[3] = "Abril";
  month[4] = "Mayo";
  month[5] = "Junio";
  month[6] = "Julio";
  month[7] = "Agosto";
  month[8] = "Septiembre";
  month[9] = "Octubre";
  month[10] = "Noviembre";
  month[11] = "Diciembre";
  return month[m];
}

exports.getDownloads = function(req, res, next) {	
  /*req format:{
    {
      "scope": "y"/"d"/"m",
      "type":"range"/"actual"/"number",
      "from": "datetime",
      "to": "datetime",
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  var actualDate=new Date();
  //console.log ("From: "+req.body.from);
  if (!req.body.from){
    req.body.from=actualDate;
  }else{
    req.body.from=new Date(req.body.from);
  }  
  if (!req.body.to){
    req.body.to=actualDate;
  }else{
    req.body.to=new Date(req.body.to);
  }

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))
  if (req.body.scope==="d"){
      idf=parseInt(fy+fm+fd);
      idt=parseInt(ty+tm+td);    
  }else if (req.body.scope==="m"){
      idf=parseInt(fy+fm);
      idt=parseInt(ty+tm);    
  }else if (req.body.scope==="y"){
      idf=parseInt(fy);
      idt=parseInt(ty);    
  }

  if (req.body.scope==="d"){
    Download = require('mongoose').model('DownloadDaily');
    if (req.body.type==="range"){

      sort={id: 1};

      match={
        id:{$gte: ""+idf, $lte: ""+idt}
      };

      //console.log(util.inspect(match));

      if (req.body.app.name!=="" && req.body.app.name!=="*" && req.body.app.name!=="any"){
        match["metadata.app.name"]=req.body.app.name;
      }else{
        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
      }

      if (req.body.app.version!=="" && req.body.app.version!=="*" && req.body.app.version!=="any"){
        match["metadata.app.version"]=req.body.app.version;
      }else{
        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
      }

      project={
        _id:0,
       "id":"$id",
       "app": "$metadata.app.name",
       "version": "$metadata.app.version",
       "package":"$metadata.package",
       "type":"$metadata.type"        
      };      
    }

    for (var i=0,max=23;i<=max;i+=1){
      project[pad(i,2)]="$hourly."+i;
    }

    //console.log(util.inspect(project));
    group={
      //_id: {scope:"$id",app:"$app",version:"$version"}
      //_id: {scope:"$id"}
      _id: null
    }

    for (var i=0,max=23;i<=max;i+=1){
      group[pad(i,2)]={$sum:"$"+pad(i,2)};
    }  


  }else if (req.body.scope==="m"){
    Download = require('mongoose').model('DownloadMonthly');
    if (req.body.type==="range"){

      
      sort={id: 1};

      match={
        id:{$gte: ""+idf, $lte: ""+idt}
      };
      if (req.body.app.name!=="" && req.body.app.name!=="*"){
        match["metadata.app.name"]=req.body.app.name;
      }else{
        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
      }

      if (req.body.app.version!=="" && req.body.app.version!=="*"){
        match["metadata.app.version"]=req.body.app.version;
      }else{
        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
      }
      //console.log(util.inspect(match));
      project={
        _id:0,
       "id":"$id",
       "app": "$metadata.app.name",
       "version": "$metadata.app.version",
       "package":"$metadata.package",
       "type":"$metadata.type"        
      };     

      for (var i=0,max=31;i<=max;i+=1){
        project[pad(i,2)]="$daily."+i;
      }
    
      group={
        //_id: {scope:"$id",app:"$app",version:"$version"},  
        //_id: {scope:"$id"},
        _id: null,
      }

      for (var i=0,max=31;i<=max;i+=1){
        group[pad(i,2)]={$sum:"$"+pad(i,2)};
      }
    }
  }else if (req.body.scope==="y"){
    Download = require('mongoose').model('DownloadYearly');
    if (req.body.type==="range"){

      sort={id: 1};

      match={
        id:{$gte: ""+idf, $lte: ""+idt}
      };

      if (req.body.app.name!=="" && req.body.app.name!=="*"){
        match["metadata.app.name"]=req.body.app.name;
      }else{
        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
      }

      if (req.body.app.version!=="" && req.body.app.version!=="*"){
        match["metadata.app.version"]=req.body.app.version;
      }else{
        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
      }
      project={
        _id:0,
       "id":"$id",
       "app": "$metadata.app.name",
       "version": "$metadata.app.version",
       "package":"$metadata.package",
       "type":"$metadata.type"        
      };

      for (var i=0,max=11;i<=max;i+=1){
        project[pad(i,2)]="$monthly."+i;
      }
    
    group={
      //_id: {scope:"$id",app:"$app",version:"$version"},  
      //_id: {scope:"$id"},  
      _id: null,  
      }

      for (var i=0,max=11;i<=max;i+=1){
        group[pad(i,2)]={$sum:"$"+pad(i,2)};
      }
    }        
  }

  if (req.body.app.version==="any"){
    group["_id"]={app:"$app",version:"$version"}
  }
  console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope=req.body.scope;
        finalResult.metadata.items=result.length;
        res.json(finalResult);
    });
};

exports.getDownloadsToday = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  //var actualDate=new Date("06-18-2015");
  var actualDate=new Date();
  //console.log ("From: "+req.body.from);
  req.body.from=actualDate;
  req.body.to=actualDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy+fm+fd);
  idt=parseInt(ty+tm+td);    

  Download = require('mongoose').model('DownloadDaily');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=23;i<=max;i+=1){
    project[pad(i,2)]="$hourly."+i;
  }

  //console.log(util.inspect(project));
  group={
    _id: null
  }

  for (var i=0,max=23;i<=max;i+=1){
    group[pad(i,2)]={$sum:"$"+pad(i,2)};
  }   

  var project2={
    _id:0
  }
  for (var i=0,max=23;i<=max;i+=1){
    project2[pad(i,2)+":00"]="$"+pad(i,2);
  }
  //console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="d";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="App Downloads desde el portal hoy. (por horas)";
        res.json(finalResult);
    });
};
        
exports.getDownloads30days = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  //var auxDate=new Date("06-18-2015")
  //var toDate=new Date("06-18-2015");
  var auxDate=new Date()
  var toDate=new Date();
  var fromDate=new Date(auxDate.setDate(auxDate.getDate() - 30));
  /*console.log ("From: "+fromDate);
  console.log ("To: "+toDate);*/
  req.body.from=fromDate;
  req.body.to=toDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy+fm+fd);
  idt=parseInt(ty+tm+td);    

  Download = require('mongoose').model('DownloadDaily');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=23;i<=max;i+=1){
    project[pad(i,2)]="$hourly."+i;
  }

  //console.log(util.inspect(project));
  group={
    //_id: {scope:"$id"}
    _id: null
  }

  for (var i=0,max=23;i<=max;i+=1){
    group[pad(i,2)]={$sum:"$"+pad(i,2)};
  }  

  var project2={_id:0};

  for (var i=0,max=23;i<=max;i+=1){
    project2[pad(i,2)+":00"]={ $divide: [ "$"+pad(i,2), 30 ] }
  }

 // console.log(util.inspect(project2));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="d";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="Media de App Downloads desde el portal últimos 30 días. (por horas)";
        res.json(finalResult);
    });
};

exports.getDownloads365days = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  var auxDate=new Date()
  var toDate=new Date();  
  //var auxDate=new Date("06-18-2015")
  //var toDate=new Date("06-18-2015");
  var fromDate=new Date(auxDate.setFullYear(auxDate.getFullYear() - 1));
  /*console.log ("From: "+fromDate);
  console.log ("To: "+toDate);*/
  req.body.from=fromDate;
  req.body.to=toDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy+fm+fd);
  idt=parseInt(ty+tm+td);    

  Download = require('mongoose').model('DownloadDaily');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=23;i<=max;i+=1){
    project[pad(i,2)]="$hourly."+i;
  }

  //console.log(util.inspect(project));
  group={
    _id: null
  }

  for (var i=0,max=23;i<=max;i+=1){
    group[pad(i,2)]={$avg:"$"+pad(i,2)};
  }    
  var project2={_id:0};

  for (var i=0,max=23;i<=max;i+=1){
    project2[pad(i,2)+":00"]={ $divide: [ "$"+pad(i,2), 365 ] }
  }

 // console.log(util.inspect(project2));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="d";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="Media de App Downloads desde el portal últimos 365 días. (por horas)";
        res.json(finalResult);
    });
};


exports.getDownloadsCurrentMonth = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  //var actualDate=new Date("06-18-2015");
  var actualDate=new Date();

  //console.log ("From: "+req.body.from);
  req.body.from=actualDate;
  req.body.to=actualDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy+fm);
  idt=parseInt(ty+tm);    

  Download = require('mongoose').model('DownloadMonthly');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=30;i<=max;i+=1){
    project[pad(i+1,2)]="$daily."+i;
  }

  //console.log(util.inspect(project));
  group={
    _id: null
  }

  for (var i=0,max=30;i<=max;i+=1){
    group[pad(i+1,2)]={$sum:"$"+pad(i+1,2)};
  } 

  var project2={
    _id:0
  }
  for (var i=0,max=30;i<=max;i+=1){
    project2[" "+pad(i+1,2)]="$"+pad(i+1,2);
  }

  //console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="m";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="App Downloads desde el portal mes en curso (por días)";
        res.json(finalResult);
    });
};


exports.getDownloads12months = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
//  var auxDate=new Date("06-18-2015")
//  var toDate=new Date("06-18-2015");
  var auxDate=new Date()
  var toDate=new Date();
  var fromDate=new Date(auxDate.setMonth(auxDate.getMonth() - 12));
  
  //console.log ("From: "+fromDate);
  //console.log ("To: "+toDate);
  req.body.from=fromDate;
  req.body.to=toDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy+fm);
  idt=parseInt(ty+tm);    

  Download = require('mongoose').model('DownloadMonthly');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=30;i<=max;i+=1){
    project[pad(i+1,2)]="$daily."+i;
  }

  //console.log(util.inspect(project));
  group={
    //_id: {scope:"$id"}
    _id: null
  }

  for (var i=0,max=30;i<=max;i+=1){
    group[pad(i+1,2)]={$sum:"$"+pad(i+1,2)};
  }  

  var project2={_id:0};

  for (var i=0,max=30;i<=max;i+=1){
    project2[" "+pad(i+1,2).toString()]={ $divide: [ "$"+pad(i+1,2), 12 ] }
  }

 // console.log(util.inspect(project2));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="m";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="Media de App Downloads desde el portal últimos 12 meses (por días)";
        res.json(finalResult);
    });
};



exports.getDownloadsCurrentYear = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  
  //var actualDate=new Date("06-18-2015");
  var actualDate=new Date();
  req.body.from=actualDate;
  req.body.to=actualDate;

  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy);
  idt=parseInt(ty);    

  Download = require('mongoose').model('DownloadYearly');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=11;i<=max;i+=1){
    project[pad(i+1,2)]="$monthly."+i;
  }

  //console.log(util.inspect(project));
  group={
    _id: null
  }

  for (var i=0,max=11;i<=max;i+=1){
    group[pad(i+1,2)]={$sum:"$"+pad(i+1,2)};
  } 

  var project2={
    _id:0
  }
  for (var i=0,max=11;i<=max;i+=1){
    project2[_monthName(i)]="$"+pad(i+1,2);
  }

  //console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="y";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="App Downloads desde el portal año "+actualDate.getFullYear()+" (por mes)";
        res.json(finalResult);
    });
};


exports.getDownloads1Year = function(req, res, next) {  
  /*req format:{
    {
      "app":{
        "name":"CVTEPortal",
        "version":"*"
      },  
      "metadata": {
      }
    }
  }*/
  var Download;

  var match={},project={},group={},sort={};
  var auxDate=new Date();
  var toDate=new Date();
  //var auxDate=new Date("06-18-2015");
  //var toDate=new Date("06-18-2015");  
  var fromDate=new Date(auxDate.setFullYear(auxDate.getFullYear() - 1));
  req.body.from=fromDate;
  req.body.to=toDate;
  //console.log ("From: "+req.body.from);
  //console.log ("To: "+req.body.to);
  var fy=req.body.from.getFullYear(),
  fm=("0" + (req.body.from.getMonth())).slice(-2),
  fd=("0" + (req.body.from.getDate())).slice(-2),
  fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),  
  ty=req.body.to.getFullYear(),
  tm=("0" + (req.body.to.getMonth())).slice(-2),
  td=("0" + (req.body.to.getDate())).slice(-2),
  th=parseInt(("0" + (req.body.to.getHours())).slice(-2))

  idf=parseInt(fy);
  //idt=parseInt(ty);    
  idt=parseInt(fy);

  Download = require('mongoose').model('DownloadYearly');
  sort={id: 1};
  match={
      id:{$gte: ""+idf, $lte: ""+idt}
  };

  if (req.body.app.name!=="" && req.body.app.name!=="*"){
    match["metadata.app.name"]=req.body.app.name;
  }else{
    match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
  }

  if (req.body.app.version!=="" && req.body.app.version!=="*"){
    match["metadata.app.version"]=req.body.app.version;
  }else{
    match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
  }

  project={
    _id:0,
    "id":"$id",
    "app": "$metadata.app.name",
    "version": "$metadata.app.version"
  };      
    
  for (var i=0,max=11;i<=max;i+=1){
    project[pad(i+1,2)]="$monthly."+i;
  }

  //console.log(util.inspect(project));
  group={
    _id: null
  }

  for (var i=0,max=11;i<=max;i+=1){
    group[pad(i+1,2)]={$sum:"$"+pad(i+1,2)};
  } 

  var project2={_id:0};
  for (var i=0,max=11;i<=max;i+=1){
    project2[_monthName(i)]={ $divide: [ "$"+pad(i+1,2), 2 ] }
  }  

  //console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group},{$project:project2}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="y";
        finalResult.metadata.items=result.length;
        //finalResult.metadata.abstract="Entradas al portal año anterior (por mes)";
        finalResult.metadata.abstract="App Downloads desde el portal año "+(toDate.getFullYear()-1)+" (por mes)";
        res.json(finalResult);
    });
};


exports.getDownloadsVersion = function(req, res, next) {  

  var Download;

  var match={},project={},group={},sort={};

  Download = require('mongoose').model('Download');
 

  project={
    _id:0,
    "app": "$app.name",
    "version": "$app.version"
  };      
    
  group={
    _id: {app:"$app",version:"$version"},
    count:{$sum:1}
  }
  var project2={
    _id:0,
    count:"$count",
    app:"$_id.app",
    version:"$_id.version",
    //label:{$concat: ["$_id.app","/","$_id.version"]}
    label:"$_id.version"
  };
  sort={count:-1};

  Download.aggregate([{$project:project},{$group:group},{$project:project2},{$sort:sort}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="total";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="App Downloads desde el portal por versión (Histórico)"
        res.json(finalResult);
    });
};

/*exports.getDownloadsApp = function(req, res, next) { 
	  var Download;

	  var match={},project={},group={},sort={};
	  var actualDate=new Date();
	  if (!req.body.from){
	    req.body.from=actualDate;
	  }else{
	    req.body.from=new Date(req.body.from);
	  }  
	  if (!req.body.to){
	    req.body.to=actualDate;
	  }else{
	    req.body.to=new Date(req.body.to);
	  }

	  if (req.body.scope==="d"){
	    Download = require('mongoose').model('DownloadDaily');
	    if (req.body.type==="range"){
	      var fy=req.body.from.getFullYear(),
	      fm=("0" + (req.body.from.getMonth()+1)).slice(-2),
	      fd=("0" + (req.body.from.getDate())).slice(-2),
	      fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),
	      idf=parseInt(fy+fm+fd);
	      
	      
	      var ty=req.body.to.getFullYear(),
	      tm=("0" + (req.body.to.getMonth()+1)).slice(-2),
	      td=("0" + (req.body.to.getDate())).slice(-2),
	      th=parseInt(("0" + (req.body.to.getHours())).slice(-2));
	      idt=parseInt(ty+tm+td);

	      sort={id: 1};

	      match={
	        id:{$gte: ""+idf, $lte: ""+idt}
	      };

	      if (req.body.app.name!=="" && req.body.app.name!=="*"){
	        match["metadata.app.name"]=req.body.app.name;
	      }else{
	        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
	      }

	      if (req.body.app.version!=="" && req.body.app.version!=="*"){
	        match["metadata.app.version"]=req.body.app.version;
	      }else{
	        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
	      }
	   

	      //console.log(util.inspect(match));

	      project={
	        _id:0,
	       "id":"$id",
	       "app": "$metadata.app.name",
	       "version": "$metadata.app.version",
	       "appPackage":"$metadata.package",
	       "type":"$metadata.type", 
	       "total":"$sum"
	      };      
	    }
	    
	    for (var i=0,max=23;i<=max;i+=1){
	        project[pad(i,2)]="$hourly."+i;
	    }	    
	    
	    group={
	      //_id: {app:"$metadata.app.name",version:"$metadata.app.version",package:"$metadata.package",type:"$metadata.type"}, 
	      //_id: {scope:"$id",app:"$app",version:"$version", appPackage:"$appPackage", type:"$type"}, 
        _id: {appPackage:"$appPackage", type:"$type"}, 
	      "total:":{$sum: "$total"}
	    }
	    
	    for (var i=0,max=23;i<=max;i+=1){
	    	group[pad(i,2)]={$sum:"$"+pad(i,2)};
	    }	    
	    
	  }else if (req.body.scope==="m"){
	    Download = require('mongoose').model('DownloadMonthly');
	    if (req.body.type==="range"){
	      var fy=req.body.from.getFullYear(),
	      fm=("0" + (req.body.from.getMonth()+1)).slice(-2),
	      fd=("0" + (req.body.from.getDate())).slice(-2),
	      idf=parseInt(fy+fm);
	      var ty=req.body.to.getFullYear(),
	      tm=("0" + (req.body.to.getMonth()+1)).slice(-2),
	      td=("0" + (req.body.to.getDate())).slice(-2),
	      idt=parseInt(ty+tm);

	      sort={id: 1};

	      match={
	        id:{$gte: ""+idf, $lte: ""+idt}
	      };
	      if (req.body.app.name!=="" && req.body.app.name!=="*"){
	        match["metadata.app.name"]=req.body.app.name;
	      }else{
	        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
	      }

	      if (req.body.app.version!=="" && req.body.app.version!=="*"){
	        match["metadata.app.version"]=req.body.app.version;
	      }else{
	        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
	      }
	      //console.log(util.inspect(match));
	      project={
	        _id:0,
	       "id":"$id",
	       "app": "$metadata.app.name",
	       "version": "$metadata.app.version",
	       "appPackage":"$metadata.package",
	       "type":"$metadata.type", 
	       "total":"$sum"
	      };     
	      
	      for (var i=0,max=30;i<=max;i+=1){
	    	project[pad(i+1,2)]="$daily."+i;
	      }
	      group={
	    	_id: {scope:"$id",app:"$app",version:"$version", appPackage:"$appPackage", type:"$type"},           
	      }
  	  	  for (var i=0,max=30;i<=max;i+=1){
		    group[pad(i+1,2)]={$sum:"$"+pad(i+1,2)};
		  }	    
	    }
	  }else if (req.body.scope==="y"){
	    Download = require('mongoose').model('DownloadYearly');
	    if (req.body.type==="range"){
	      var fy=req.body.from.getFullYear(),
	      fm=("0" + (req.body.from.getMonth()+1)).slice(-2),
	      idf=parseInt(fy);
	      var ty=req.body.to.getFullYear(),
	      tm=("0" + (req.body.to.getMonth()+1)).slice(-2)
	      idt=parseInt(ty);

	      sort={id: 1};

	      match={
	        id:{$gte: ""+idf, $lte: ""+idt}
	      };

	      if (req.body.app.name!=="" && req.body.app.name!=="*"){
	        match["metadata.app.name"]=req.body.app.name;
	      }else{
	        match["metadata.app.name"]={$regex: "^(?!\s*$).+"};
	      }

	      if (req.body.app.version!=="" && req.body.app.version!=="*"){
	        match["metadata.app.version"]=req.body.app.version;
	      }else{
	        match["metadata.app.version"]={$regex: "^(?!\s*$).+"};
	      }
	      project={
	        _id:0,
	       "id":"$id",
	       "app": "$metadata.app.name",
	       "version": "$metadata.app.version",
	       "appPackage":"$metadata.package",
	       "type":"$metadata.type", 
	       "total":"$sum"
	      };      
	      for (var i=0,max=11;i<=max;i+=1){
	          project[pad(i,2)]="$monthly."+i;
	      }
 	    
	      group={
	    	//_id: {app:"$metadata.app.name",version:"$metadata.app.version",package:"$metadata.package",type:"$metadata.type"}, 
	        _id: {scope:"$id",app:"$app",version:"$version", appPackage:"$appPackage", type:"$type"}   
	      }
	      
	      for (var i=0,max=11;i<=max;i+=1){
	          group[pad(i,2)]={$sum:"$"+pad(i,2)};
	      }	    
	    }        
	  }

	  //console.log(util.inspect(match));
	  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group}],function (err, result) {
	      var finalResult={}
	        if (err) {
	            console.log(err);
	            return;
	        }
	        finalResult.data=result;
	        finalResult.metadata={};
	        finalResult.metadata.scope=req.body.scope;
	        finalResult.metadata.items=result.length;
	        res.json(finalResult);
	    });
	};*/



exports.getDownloadsApp = function(req, res, next) {  

  var Connect;

  var match={},project={},group={},sort={};

  Download = require('mongoose').model('Download');
 

  project={
    _id:0,
    "id":"$id",
    "app": "$app.name",
    "version": "$app.version",
    "appPackage":"$package",
    "type":"$type", 
    "total":"$sum"
  };     
    
  group={
    _id: {appPackage:"$appPackage", type:"$type"},
    count:{$sum:1}
  }

  var project2={
    _id:1,
    count:"$count",
    appPackage:"$_id.appPackage",
    type:"$_id.type",
    label:{$concat: ["$_id.appPackage","/","$_id.type"]}
  };

  sort={count:-1};
  var limit=10
  Download.aggregate([{$project:project},{$group:group},{$project:project2},{$sort:sort},{$limit:limit}],function (err, result) {
      var finalResult={}
        if (err) {
            console.log(err);
            return;
        }
        finalResult.data=result;
        finalResult.metadata={};
        finalResult.metadata.scope="total";
        finalResult.metadata.items=result.length;
        finalResult.metadata.abstract="Top ten Downloads (Histórico)"
        res.json(finalResult);
    });
};
