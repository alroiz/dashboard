var util = require('util');

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

exports.getDevices = function(req, res, next) {  
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
  var Connect;

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

  Connect = require('mongoose').model('Connect');


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
    if (req.body.type==="range"){

      sort={mac:1, date: 1};
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
        "app": "$app.name",
        "version": "$app.version",
        "date":"$date",
        "mac":"$mac",
        "dateInt":{
                  $concat:[
                    { "$substr": [ { "$year": "$date" }, 0, 4 ] },
                    { "$cond": [
                      { "$lte": [ { "$month": "$date" }, 9 ] },
                      { "$concat": [
                          "0", { "$substr": [ { "$month": "$date" }, 0, 2 ] }
                      ]},
                      { "$substr": [ { "$month": "$date" }, 0, 2 ] }
                    ]},
                    { "$cond": [
                      { "$lte": [ { "$dayOfMonth": "$date" }, 9 ] },
                      { "$concat": [
                          "0", { "$substr": [ { "$dayOfMonth": "$date" }, 0, 2 ] }
                      ]},
                      { "$substr": [ { "$dayOfMonth": "$date" }, 0, 2 ] }
                    ]}
                  ]
                }
      };      
    
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };

      var group1={
        _id: "$mac",
        //_id: {mac:"$mac",date:"$dateInt"},
        dateInt:{$first: "$dateInt"},
        firstDate: {$first: "$date"},
        mac: {$first: "$mac"}
      }

      var project2={
        _id:0,
        "date":"$firstDate",
        "dateInt":"$dateInt",
        "mac":"$mac"
      };      
      
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };

      var group2={
        _id: {date: "$dateInt"},
        devices: {$sum:1},
        date:{$first:"$date"},
        dateInt:{$first:"$dateInt"}
      }

      var project3={
        _id:1,
        devices:1,
        dateInt:1,
        date:1
      }      
    }
  }else if (req.body.scope==="m"){
    if (req.body.type==="range"){

      sort={mac:1, date: 1};

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
        "app": "$app.name",
        "version": "$app.version",
        "date":"$date",
        "mac":"$mac",
        "dateInt":{
                  $concat:[
                    { "$substr": [ { "$year": "$date" }, 0, 4 ] },
                    { "$cond": [
                      { "$lte": [ { "$month": "$date" }, 9 ] },
                      { "$concat": [
                          "0", { "$substr": [ { "$month": "$date" }, 0, 2 ] }
                      ]},
                      { "$substr": [ { "$month": "$date" }, 0, 2 ] }
                    ]}
                  ]
                }
      };      
    
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };

      var group1={
        _id: "$mac",
        //_id: {mac:"$mac",date:"$dateInt"},
        dateInt:{$first: "$dateInt"},
        firstDate: {$first: "$date"},
        mac: {$first: "$mac"}
      }

      var project2={
        _id:0,
        "date":"$firstDate",
        "dateInt":"$dateInt",
        "mac":"$mac"
      };      
      
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };

      var group2={
        _id: {date: "$dateInt"},
        devices: {$sum:1},
        date:{$first:"$date"},
        dateInt:{$first:"$dateInt"}
      }

      var project3={
        _id:1,
        devices:1,
        dateInt:1,
        date:1
      }      
    }
  }else if (req.body.scope==="y"){
    if (req.body.type==="range"){

      sort={mac:1, date: 1};


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
        "app": "$app.name",
        "version": "$app.version",
        "date":"$date",
        "mac":"$mac",
        "dateInt": { "$substr": [ { "$year": "$date" }, 0, 4 ] }
      };      
    
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };
      console.log(match2);
      var group1={
        _id: "$mac",
        //_id: {mac:"$mac",date:"$dateInt"},
        dateInt:{$first: "$dateInt"},
        firstDate: {$first: "$date"},
        mac: {$first: "$mac"}
      }

      var project2={
        _id:0,
        "date":"$firstDate",
        "dateInt":"$dateInt",
        "mac":"$mac"
      };      
      
      var match2={
        dateInt:{$gte: ""+idf, $lte: ""+idt}
      };

      var group2={
        _id: {date: "$dateInt"},
        devices: {$sum:1},
        date:{$first:"$date"},
        dateInt:{$first:"$dateInt"}
      }

      var project3={
        _id:1,
        devices:1,
        dateInt:1,
        date:1
      }      
    }
  }

  //console.log(util.inspect(match2)); 
  //console.log(util.inspect(match));

  Connect.aggregate([{$sort:sort},{$project:project},{$match:match2},{$group:group1},{$project:project2},{$group:group2},{$project:project3}],function (err, result) {
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


exports.getDevicesToday = function(req, res, next) {  

	  var Connect;

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

	  idf=parseInt(fy+fm+fd+"00");
	  idt=parseInt(ty+tm+td+"23"); 

	  Connect = require('mongoose').model('Connect');


	      sort={mac:1, date: 1};
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
	        "app": "$app.name",
	        "version": "$app.version",
	        "date":"$date",
	        "mac":"$mac",
	        "dateInt":{
	                  $concat:[
	                    { "$substr": [ { "$year": "$date" }, 0, 4 ] },
	                    { "$cond": [
	                      { "$lte": [ { "$month": "$date" }, 9 ] },
	                      { "$concat": [
	                          "0", { "$substr": [ { "$month": "$date" }, 0, 2 ] }
	                      ]},
	                      { "$substr": [ { "$month": "$date" }, 0, 2 ] }
	                    ]},
	                    { "$cond": [
	                      { "$lte": [ { "$dayOfMonth": "$date" }, 9 ] },
	                      { "$concat": [
	                          "0", { "$substr": [ { "$dayOfMonth": "$date" }, 0, 2 ] }
	                      ]},
	                      { "$substr": [ { "$dayOfMonth": "$date" }, 0, 2 ] },
	                      { "$substr": [ { "$hour": "$date" }, 0, 2 ] }
	                    ]}
	                  ]
	                }
	      };      


	      var group1={
	        _id: "$mac",
	        //_id: {mac:"$mac",date:"$dateInt"},
	        dateInt:{$first: "$dateInt"},
	        firstDate: {$first: "$date"},
	        mac: {$first: "$mac"}
	      }

	      var project2={
	        _id:0,
	        "date":"$firstDate",
	        "dateInt":"$dateInt",
	        "mac":"$mac"
	      };      
	      
	      var match2={
	        dateInt:{$gte: ""+idf, $lte: ""+idt}
	      };

	      var group2={
	        _id: {date: "$dateInt"},
	        devices: {$sum:1},
	        date:{$first:"$date"},
	        dateInt:{$first:"$dateInt"}
	      }

	      var project3={
	        _id:1,
	        devices:1,
	        dateInt:1,
	        date:1
	      }      

	  //console.log(util.inspect(match2)); 
	  //console.log(util.inspect(match));

	  Connect.aggregate([{$sort:sort},{$project:project},{$match:match2},{$group:group1},{$project:project2},{$group:group2},{$project:project3}],function (err, result) {
	      var finalResult={}
	        if (err) {
	            console.log(err);
	            return;
	        }
	        finalResult.data=result;
	        finalResult.metadata={};
	        finalResult.metadata.scope=req.body.scope;
	        finalResult.metadata.items=result.length;
	        finalResult.metadata.abstract="Dispositivos conectados por primera vez hoy. (por horas)";
	        res.json(finalResult);
	    });
	};