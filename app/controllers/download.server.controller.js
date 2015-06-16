var util = require('util');

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
      fm=("0" + (req.body.from.getMonth())).slice(-2),
      fd=("0" + (req.body.from.getDate())).slice(-2),
      fh=parseInt(("0" + (req.body.from.getHours())).slice(-2)),
      idf=parseInt(fy+fm+fd);
      
      
      var ty=req.body.to.getFullYear(),
      tm=("0" + (req.body.to.getMonth())).slice(-2),
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
       "package":"$metadata.package",
       "type":"$metadata.type",       
       "00":"$hourly.0",
       "01":"$hourly.1",
       "02":"$hourly.2",
       "03":"$hourly.3",
       "04":"$hourly.4",
       "05":"$hourly.5",
       "06":"$hourly.6",
       "07":"$hourly.7",       
       "08":"$hourly.8",
       "09":"$hourly.9",
       "10":"$hourly.10",
       "11":"$hourly.11",       
       "12":"$hourly.12",
       "13":"$hourly.13",
       "14":"$hourly.14",
       "15":"$hourly.15",       
       "16":"$hourly.16",
       "17":"$hourly.17",
       "18":"$hourly.18",
       "19":"$hourly.19",       
       "20":"$hourly.20",
       "21":"$hourly.21",
       "22":"$hourly.22",
       "23":"$hourly.23"  
      };      
    }
    
    group={
      //_id: {app:"$metadata.app.name",version:"$metadata.app.version",package:"$metadata.package",type:"$metadata.type"}, 
      _id: {scope:"$id",app:"$app",version:"$version"}, 
      "00":{ $sum: "$00" },      
      "01":{ $sum: "$01" },
      "02":{ $sum: "$02" },
      "03":{ $sum: "$03" },
      "04":{ $sum: "$04" },
      "05":{ $sum: "$05" },
      "06":{ $sum: "$06" },
      "07":{ $sum: "$07" },
      "08":{ $sum: "$08" },
      "09":{ $sum: "$09" },
      "10":{ $sum: "$10" },
      "11":{ $sum: "$11" },      
      "12":{ $sum: "$12" },
      "13":{ $sum: "$13" },
      "14":{ $sum: "$14" },
      "15":{ $sum: "$15" },
      "16":{ $sum: "$16" },      
      "17":{ $sum: "$17" },
      "18":{ $sum: "$18" },
      "19":{ $sum: "$19" },
      "20":{ $sum: "$20" },
      "21":{ $sum: "$21" },      
      "22":{ $sum: "$22" },
      "23":{ $sum: "$23" }
    }



  }else if (req.body.scope==="m"){
    Download = require('mongoose').model('DownloadMonthly');
    if (req.body.type==="range"){
      var fy=req.body.from.getFullYear(),
      fm=("0" + (req.body.from.getMonth())).slice(-2),
      fd=("0" + (req.body.from.getDate())).slice(-2),
      idf=parseInt(fy+fm);
      var ty=req.body.to.getFullYear(),
      tm=("0" + (req.body.to.getMonth())).slice(-2),
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
      console.log(util.inspect(match));
      project={
        _id:0,
       "id":"$id",
       "app": "$metadata.app.name",
       "version": "$metadata.app.version",
       "package":"$metadata.package",
       "type":"$metadata.type",
       "00":"$daily.0",
       "01":"$daily.1",
       "02":"$daily.2",
       "03":"$daily.3",
       "04":"$daily.4",
       "05":"$daily.5",
       "06":"$daily.6",
       "07":"$daily.7",       
       "08":"$daily.8",
       "09":"$daily.9",
       "10":"$daily.10",
       "11":"$daily.11",       
       "12":"$daily.12",
       "13":"$daily.13",
       "14":"$daily.14",
       "15":"$daily.15",       
       "16":"$daily.16",
       "17":"$daily.17",
       "18":"$daily.18",
       "19":"$daily.19",       
       "20":"$daily.20",
       "21":"$daily.21",
       "22":"$daily.22",
       "23":"$daily.23",
       "24":"$daily.24",
       "25":"$daily.25",
       "26":"$daily.26",       
       "27":"$daily.27",
       "28":"$daily.28",
       "29":"$daily.29",
       "30":"$daily.30",       
       "31":"$daily.31"              
      };      
    
    group={
      _id: {scope:"$id",app:"$app",version:"$version"},
      "00":{ $sum: "$00" },      
      "01":{ $sum: "$01" },
      "02":{ $sum: "$02" },
      "03":{ $sum: "$03" },
      "04":{ $sum: "$04" },
      "05":{ $sum: "$05" },
      "06":{ $sum: "$06" },
      "07":{ $sum: "$07" },
      "08":{ $sum: "$08" },
      "09":{ $sum: "$09" },
      "10":{ $sum: "$10" },
      "11":{ $sum: "$11" },      
      "12":{ $sum: "$12" },
      "13":{ $sum: "$13" },
      "14":{ $sum: "$14" },
      "15":{ $sum: "$15" },
      "16":{ $sum: "$16" },      
      "17":{ $sum: "$17" },
      "18":{ $sum: "$18" },
      "19":{ $sum: "$19" },
      "20":{ $sum: "$20" },
      "21":{ $sum: "$21" },      
      "22":{ $sum: "$22" },
      "23":{ $sum: "$23" },
      "24":{ $sum: "$24" },
      "25":{ $sum: "$25" },
      "26":{ $sum: "$26" },
      "27":{ $sum: "$27" },
      "28":{ $sum: "$28" },      
      "29":{ $sum: "$29" },
      "30":{ $sum: "$30" },      
      "31":{ $sum: "$31" }            
      }
    }
  }else if (req.body.scope==="y"){
    Download = require('mongoose').model('DownloadYearly');
    if (req.body.type==="range"){
      var fy=req.body.from.getFullYear(),
      fm=("0" + (req.body.from.getMonth())).slice(-2),
      idf=parseInt(fy);
      var ty=req.body.to.getFullYear(),
      tm=("0" + (req.body.to.getMonth())).slice(-2)
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
       "00":"$monthly.0",
       "01":"$monthly.1",
       "02":"$monthly.2",
       "03":"$monthly.3",
       "04":"$monthly.4",
       "05":"$monthly.5",
       "06":"$monthly.6",
       "07":"$monthly.7",       
       "08":"$monthly.8",
       "09":"$monthly.9",
       "10":"$monthly.10",
       "11":"$monthly.11"       
      };      
    
    group={
      //_id: {app:"$metadata.app.name",version:"$metadata.app.version",package:"$metadata.package",type:"$metadata.type"}, 
      _id: {scope:"$id",app:"$app",version:"$version"},
      "00":{ $sum: "$00" },      
      "01":{ $sum: "$01" },
      "02":{ $sum: "$02" },
      "03":{ $sum: "$03" },
      "04":{ $sum: "$04" },
      "05":{ $sum: "$05" },
      "06":{ $sum: "$06" },
      "07":{ $sum: "$07" },
      "08":{ $sum: "$08" },
      "09":{ $sum: "$09" },
      "10":{ $sum: "$10" },
      "11":{ $sum: "$11" }     
      }
    }        
  }

  //console.log(util.inspect(match));
  Download.aggregate([{$match:match},{$sort:sort},{$project:project},{$group:group}],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.json(result);
    });
};